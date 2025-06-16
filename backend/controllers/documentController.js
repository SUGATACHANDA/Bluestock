const prisma = require("../models/documentModel");
const supabase = require("../supabaseClient");
const { v4: uuidv4 } = require("uuid");

exports.uploadDocuments = async (req, res) => {
    try {
        const { ipo_id } = req.body;
        const files = req.files;

        if (!ipo_id) {
            return res.status(400).json({ message: "IPO ID is required" });
        }

        if (!files || (!files.rhp_pdf && !files.drhp_pdf)) {
            return res.status(400).json({ message: "No files uploaded" });
        }

        let rhpUrl = null;
        let drhpUrl = null;

        if (files.rhp_pdf) {
            const ext = files.rhp_pdf[0].originalname.split(".").pop();
            const fileName = `${uuidv4()}.${ext}`;
            const { error } = await supabase.storage
                .from(process.env.SUPABASE_BUCKET_NAME)
                .upload(fileName, files.rhp_pdf[0].buffer, {
                    contentType: files.rhp_pdf[0].mimetype,
                });
            if (error) throw error;

            const { data: publicURLData } = supabase.storage
                .from(process.env.SUPABASE_BUCKET_NAME)
                .getPublicUrl(fileName);
            rhpUrl = publicURLData.publicUrl;
        }

        if (files.drhp_pdf) {
            const ext = files.drhp_pdf[0].originalname.split(".").pop();
            const fileName = `${uuidv4()}.${ext}`;
            const { error } = await supabase.storage
                .from(process.env.SUPABASE_BUCKET_NAME)
                .upload(fileName, files.drhp_pdf[0].buffer, {
                    contentType: files.drhp_pdf[0].mimetype,
                });
            if (error) throw error;

            const { data: publicURLData } = supabase.storage
                .from(process.env.SUPABASE_BUCKET_NAME)
                .getPublicUrl(fileName);
            drhpUrl = publicURLData.publicUrl;
        }

        const newDoc = await prisma.document.create({
            data: {
                ipo_id,
                rhp_pdf: rhpUrl || null,
                drhp_pdf: drhpUrl || null,
            },
        });

        return res
            .status(201)
            .json({ message: "Documents uploaded successfully", document: newDoc });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Error uploading documents",
            error: err.message || err,
        });
    }
};
