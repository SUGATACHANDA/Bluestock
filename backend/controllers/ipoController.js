const prisma = require("../models/ipoModel");
const prismaDoc = require("../models/documentModel");
const supabase = require("../supabaseClient");
const { v4: uuidv4 } = require("uuid");

exports.createIPO = async (req, res) => {
    try {
        const {
            company_id,
            price_band,
            open_date,
            close_date,
            issue_size,
            issue_type,
            listing_date,
            status,
            ipo_price,
            listing_price,
            listing_gain,
            current_market_price,
            current_return,
        } = req.body;

        if (!company_id) return res.status(400).json({ message: "Company ID is required" });

        let rhpUrl = null;
        let drhpUrl = null;

        if (req.files?.rhp_pdf?.[0]) {
            const ext = req.files.rhp_pdf[0].originalname.split(".").pop();
            const fileName = `${uuidv4()}.${ext}`;
            const { error } = await supabase.storage
                .from(process.env.SUPABASE_BUCKET_NAME)
                .upload(fileName, req.files.rhp_pdf[0].buffer, {
                    contentType: req.files.rhp_pdf[0].mimetype,
                });
            if (error) throw error;
            rhpUrl = supabase.storage.from(process.env.SUPABASE_BUCKET_NAME).getPublicUrl(fileName).data.publicUrl;
        }

        if (req.files?.drhp_pdf?.[0]) {
            const ext = req.files.drhp_pdf[0].originalname.split(".").pop();
            const fileName = `${uuidv4()}.${ext}`;
            const { error } = await supabase.storage
                .from(process.env.SUPABASE_BUCKET_NAME)
                .upload(fileName, req.files.drhp_pdf[0].buffer, {
                    contentType: req.files.drhp_pdf[0].mimetype,
                });
            if (error) throw error;
            drhpUrl = supabase.storage.from(process.env.SUPABASE_BUCKET_NAME).getPublicUrl(fileName).data.publicUrl;
        }

        const allowedStatuses = ["UPCOMING", "OPEN", "CLOSED", "LISTED"];
        const statusUpper = status.toUpperCase();
        if (!allowedStatuses.includes(statusUpper)) {
            return res.status(400).json({ message: "Invalid IPO status value" });
        }


        const newIPO = await prisma.create({
            data: {
                company_id,
                price_band,
                open_date: open_date ? new Date(open_date) : null,
                close_date: close_date ? new Date(close_date) : null,
                issue_size,
                issue_type,
                listing_date: listing_date ? new Date(listing_date) : null,
                status: statusUpper,
                ipo_price: parseFloat(ipo_price || 0),
                listing_price: parseFloat(listing_price || 0),
                listing_gain: parseFloat(listing_gain || 0),
                current_market_price: parseFloat(current_market_price || 0),
                current_return: parseFloat(current_return || 0),
            },
        });

        if (rhpUrl || drhpUrl) {
            await prismaDoc.create({
                data: {
                    ipo_id: newIPO.ipo_id,
                    rhp_pdf: rhpUrl,
                    drhp_pdf: drhpUrl,
                },
            });
        }

        res.status(201).json({ message: "IPO created successfully", ipo: newIPO });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating IPO", error: err });
    }
};

exports.getAllIPOs = async (req, res) => {
    try {
        const ipos = await prisma.findMany({
            include: { company: true },
        });
        return res.json(ipos);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error fetching IPOs" });
    }
};

exports.getIPOById = async (req, res) => {
    const { id } = req.params;

    try {
        const ipo = await prisma.findUnique({
            where: { ipo_id: id },
            include: {
                company: true,
                documents: true,
            },
        });

        if (!ipo) {
            return res.status(404).json({ success: false, message: "IPO not found" });
        }

        res.json({
            ...ipo,
            open_date: ipo.open_date ? ipo.open_date.toISOString() : null,
            close_date: ipo.close_date ? ipo.close_date.toISOString() : null,
            listing_date: ipo.listing_date ? ipo.listing_date.toISOString() : null,
            rhp_pdf: ipo.rhp_pdf || (ipo.documents[0] && ipo.documents[0].rhp_pdf) || null,
            drhp_pdf: ipo.drhp_pdf || (ipo.documents[0] && ipo.documents[0].drhp_pdf) || null,
            company_name: ipo.company.company_name,
            logo: ipo.company.logo, // If you have this field in your company model
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

exports.updateIPO = async (req, res) => {
    try {
        const { id } = req.params;
        const { company_id, price_band, open_date, close_date, issue_size, issue_type, listing_date, status, ipo_price, listing_price, listing_gain, current_market_price, current_return } = req.body;

        const updateData = {
            company_id,
            price_band,
            open_date: open_date ? new Date(open_date) : undefined,
            close_date: close_date ? new Date(close_date) : undefined,
            issue_size,
            issue_type,
            listing_date: listing_date ? new Date(listing_date) : undefined,
            status,
            ipo_price: parseFloat(ipo_price),
            listing_price: parseFloat(listing_price),
            listing_gain: parseFloat(listing_gain),
            current_market_price: parseFloat(current_market_price),
            current_return: parseFloat(current_return),
        };

        if (req.files?.rhp_pdf?.[0]) {
            const ext = req.files.rhp_pdf[0].originalname.split(".").pop();
            const fileName = `${uuidv4()}.${ext}`;
            const { error } = await supabase.storage.from(process.env.SUPABASE_BUCKET_NAME).upload(fileName, req.files.rhp_pdf[0].buffer, {
                contentType: req.files.rhp_pdf[0].mimetype,
                upsert: true,
            });
            if (error) throw error;
            const { data } = supabase.storage.from(process.env.SUPABASE_BUCKET_NAME).getPublicUrl(fileName);
            updateData.rhp_pdf = data.publicUrl;
        }

        if (req.files?.drhp_pdf?.[0]) {
            const ext = req.files.drhp_pdf[0].originalname.split(".").pop();
            const fileName = `${uuidv4()}.${ext}`;
            const { error } = await supabase.storage.from(process.env.SUPABASE_BUCKET_NAME).upload(fileName, req.files.drhp_pdf[0].buffer, {
                contentType: req.files.drhp_pdf[0].mimetype,
                upsert: true,
            });
            if (error) throw error;
            const { data } = supabase.storage.from(process.env.SUPABASE_BUCKET_NAME).getPublicUrl(fileName);
            updateData.drhp_pdf = data.publicUrl;
        }

        const updatedIPO = await prisma.update({
            where: { ipo_id: id },
            data: updateData,
        });

        res.status(200).json(updatedIPO);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to update IPO", error: err.message });
    }
};

exports.deleteIPO = async (req, res) => {
    try {
        await prisma.iPO.delete({
            where: { ipo_id: req.params.id },
        });
        return res.json({ success: true, message: "IPO deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error deleting IPO" });
    }
};
