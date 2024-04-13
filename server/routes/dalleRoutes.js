import express from "express";
import * as dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const router = express.Router();

const openai = new OpenAI(process.env.OPENAI_API_KEY);

router.route("/").get((req, res) => {
  res.status(200).json({ message: "Hello from DALL-E!" });
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const aiResponse = await openai.images.generate({
      prompt: prompt,
      quality: "hd",
      response_format: "b64_json",
      n: 1,
      size: "1024x1024",
    });

    const image = aiResponse.data[0].b64_json;
    res.status(200).json({ photo: image, success: true });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ err: error?.message, success: false });
  }
});

export default router;
