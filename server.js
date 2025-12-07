require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

// Serve frontend files
app.use(express.static(path.join(__dirname, "public")));

const DOOD_API_KEY = "548978dh0kv5sho1wt253z";  // put in .env later

// ✅ FETCH DOOD FOLDER FILES ONLY
app.get("/api/dood-uploads", async (req, res) => {
    try {
        const url = `https://doodapi.co/api/folder/list?key=${DOOD_API_KEY}`;

        const { data } = await axios.get(url);

        console.log(data);

        if (!data || !data.result || !Array.isArray(data.result.files)) {
            return res.json({ status: 200, result: [] });
        }

        const uploads = data.result.files.map(item => ({
            file_code: item.file_code,
            title: item.title,
            uploaded: item.uploaded,
            splash_img: item.splash_img,
            single_img: item.single_img
        }));

        res.json({
            status: 200,
            result: uploads
        });

    } catch (error) {
        console.error("❌ DOOD API ERROR:", error.message);
        res.status(500).json({ error: "Failed to fetch videos" });
    }
});

// Start server
app.listen(5000, () => {
    console.log("🚀 Server running at http://localhost:5000");
});
