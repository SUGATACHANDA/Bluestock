const prisma = require("../models/companyModel");
const supabase = require("../supabaseClient");
const { v4: uuidv4 } = require("uuid");

exports.createCompany = async (req, res) => {
    try {

        const {
            company_name,
            companyOverview,
            businessDescription,
            objectives,
            revenue,
            netProfit,
            totalAssets,
            bookValue,
            riskFactors,
        } = req.body

        let company_logo = null

        if (req.file) {
            const ext = req.file.originalname.split(".").pop()
            const fileName = `${uuidv4()}.${ext}`
            const { error } = await supabase.storage.from(process.env.SUPABASE_BUCKET_NAME).upload(
                fileName, req.file.buffer, {
                contentType: req.file.mimetype,
                upsert: false
            })

            if (error) throw error

            const { data: publicURLData } = supabase.storage.from(process.env.SUPABASE_BUCKET_NAME)
                .getPublicUrl(fileName)

            company_logo = publicURLData.publicUrl
        }

        const company = await prisma.create({
            data: {
                company_name,
                company_logo,
                companyOverview: JSON.parse(companyOverview),
                businessDescription: JSON.parse(businessDescription),
                objectives: JSON.parse(objectives),
                riskFactors: JSON.parse(riskFactors),
                revenue,
                netProfit,
                totalAssets,
                bookValue,
            }
        })

        res.status(201).json({
            status: "success",
            data: company
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: "fail",
            message: "Error creating company", error: error
        })
    }
}

exports.getAllCompanies = async (req, res) => {
    try {
        const companies = await prisma.findMany()
        res.json(companies)
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: "Error fetching companies", error: error
        })
    }
}

exports.getCompanyById = async (req, res) => {
    try {
        const company = await prisma.findUnique({
            where: { company_id: req.params.id }
        })
        if (!company) return res.status(404).json({ message: "Company Not Found" })
        res.json(company)
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: "Error fetching company", error: error
        })
    }
}

exports.updateComapany = async (req, res) => {
    try {
        const company = await prisma.update({
            where: { company_id: req.params.id },
            data: req.body
        })
        res.json(company)
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: "Error updating company", error: error
        })
    }
}

exports.deleteCompany = async (req, res) => {
    try {
        await prisma.delete({
            where: { company_id: req.params.id }
        })
        res.status(204).json({ message: "Company deleted successfully" })
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: "Error deleting company", error: error
        })
    }
}