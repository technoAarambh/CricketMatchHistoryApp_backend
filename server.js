require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const API_KEY = "Enter Your Key";

app.post("/generate", async (req, res) => {
  try {
    const { matchSummary } = req.body;
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash-lite:generateContent?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: `Summarize this cricket match: ${matchSummary}` }],
          },
        ],
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
