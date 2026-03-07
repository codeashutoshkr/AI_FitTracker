require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function listModels() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  try {
    // There isn't a direct listModels on genAI in the newer SDK, but we can try to find documentation or use a known good model.
    // However, we can try to fetch from the raw endpoint if needed.
    // For now, let's try a few common variants.
    const models = ["gemini-1.5-flash", "gemini-1.5-flash-001", "gemini-1.5-flash-002", "gemini-1.5-pro", "gemini-pro"];
    
    for (const modelName of models) {
      try {
        console.log(`Testing model: ${modelName}...`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Hi");
        console.log(`SUCCESS with ${modelName}:`, result.response.text());
        break; 
      } catch (e) {
        console.log(`FAILED with ${modelName}:`, e.message);
      }
    }
  } catch (err) {
    console.error("General error:", err.message);
  }
}

listModels();
