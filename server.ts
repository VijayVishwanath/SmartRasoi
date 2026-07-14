import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Set up server-side Gemini client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

app.use(express.json());

// API Endpoints
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date() });
});

// Endpoint 1: Zero-Waste Jugaad Recipe Generator
app.post("/api/recipe", async (req, res) => {
  const { ingredients, dietType, prepTime, language } = req.body;

  if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
    return res.status(400).json({ error: "At least one ingredient is required." });
  }

  const ingredientsList = ingredients.join(", ");
  const userLanguage = language || "English (with regional Indian names for spices and foods)";

  const prompt = `You are a legendary, Michelin-star Indian Home Chef and frugal innovator (Jugaad Architect).
Create ONE highly creative, mouthwatering, and practical Indian recipe using primary ingredients from this list: [${ingredientsList}].
You can assume standard Indian pantry staples are available (salt, turmeric/haldi, oil, cumin/jeera, mustard seeds/rai, water).
Tailor the recipe according to:
- Diet Type: ${dietType} (e.g. veg, vegan, any)
- Prep Time Limit: ${prepTime} mins
- Response Language: The text should be returned in ${userLanguage}.

Be highly innovative! For example:
- Leftover roti can become a Chapati Frankie, Roti Noodles, or crispy Roti Nachos.
- Leftover rice can become Lemon Rice, Masala Rice Balls, or Rice Kheer.
- Sour curd can become a comforting Kadhi or Curd Rice.
- Stems (like dhania stems) or peels (like potato/gourd peels) can become spicy chutneys or crispy snacks.

Explain clearly why this is a smart, zero-waste kitchen hack that saves money and reduces waste.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an expert Indian culinary innovator specializing in frugal innovation (Jugaad), regional Indian home cooking, and zero-waste kitchens. You provide highly detailed, practical, and delicious culinary solutions in structured JSON.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: [
            "recipeName",
            "recipeHinglishName",
            "description",
            "prepCookTime",
            "difficulty",
            "estimatedSavings",
            "dietLabel",
            "ingredients",
            "instructions",
            "jugaadProTip"
          ],
          properties: {
            recipeName: {
              type: Type.STRING,
              description: "English name of the recipe (e.g., Crispy Roti Pizza Samosa).",
            },
            recipeHinglishName: {
              type: Type.STRING,
              description: "Hinglish/regional colloquial name (e.g., Chapati Frankie Roll or Kadhi Jugaad).",
            },
            description: {
              type: Type.STRING,
              description: "1-2 sentence appetizing description highlighting how it creatively solves the leftover/waste problem.",
            },
            prepCookTime: {
              type: Type.STRING,
              description: "Estimated preparation + cooking time (e.g., '15 mins').",
            },
            difficulty: {
              type: Type.STRING,
              description: "Difficulty level ('Easy', 'Medium', 'Advanced').",
            },
            estimatedSavings: {
              type: Type.STRING,
              description: "Approximate money saved compared to ordering/buying food (e.g., '₹80 - ₹120 saved').",
            },
            dietLabel: {
              type: Type.STRING,
              description: "E.g., 'Vegetarian', 'Vegan', 'No Onion-Garlic' or 'Gluten-Free'.",
            },
            ingredients: {
              type: Type.ARRAY,
              description: "List of ingredients required for this recipe.",
              items: {
                type: Type.OBJECT,
                required: ["name", "amount", "isKeyLeftover"],
                properties: {
                  name: {
                    type: Type.STRING,
                    description: "Ingredient name, using regional names where helpful (e.g., 'Curry leaves (Kadi patta)', 'Coriander leaves (Dhania)').",
                  },
                  amount: {
                    type: Type.STRING,
                    description: "Measurement (e.g., '2 leftover Rotis', '1 cup', '1/2 tsp').",
                  },
                  isKeyLeftover: {
                    type: Type.BOOLEAN,
                    description: "True if this is one of the leftover/fridge-clearance items the user provided.",
                  },
                },
              },
            },
            instructions: {
              type: Type.ARRAY,
              description: "Step-by-step cooking directions.",
              items: {
                type: Type.STRING,
              },
            },
            jugaadProTip: {
              type: Type.STRING,
              description: "An innovative 'Jugaad' tip: what to substitute if they lack common secondary items, or a secret trick to make it taste even better.",
            },
          },
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from Gemini API");
    }

    const recipeData = JSON.parse(text.trim());
    res.json(recipeData);
  } catch (error: any) {
    console.error("Recipe generation error:", error);
    res.status(500).json({ error: error.message || "Failed to generate recipe." });
  }
});

// Endpoint 2: Dadi Ma's Home Remedy (Nuskha) Generator
app.post("/api/remedy", async (req, res) => {
  const { ailment, availableSpices, language } = req.body;

  if (!ailment) {
    return res.status(400).json({ error: "Ailment is required." });
  }

  const spicesList = availableSpices && availableSpices.length > 0 
    ? availableSpices.join(", ") 
    : "standard Indian kitchen spices (Turmeric/Haldi, Ginger/Adrak, Black Pepper/Kali mirch, Honey, Tulsi, Fennel/Saunf, Cumin/Jeera, Carom/Ajwain)";
  const userLanguage = language || "English (with regional Indian names)";

  const prompt = `You are a loving, wise Indian Grandmother (Dadi Ma / Nani Ma) and traditional wellness expert.
Provide ONE time-tested, gentle, and highly effective home remedy (Nuskha) for the following minor ailment: "${ailment}".
Prioritize utilizing ingredients from this available kitchen/spice list: [${spicesList}].
Make sure the remedy only uses common, safe household spices and herbs, and provides precise preparation instructions.
The response should be in ${userLanguage}.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are a warm, nurturing Indian Grandmother and expert in Ayurveda and traditional home remedies. You provide comforting, safe, and practical home remedies in structured JSON.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: [
            "remedyName",
            "remedyLocalName",
            "scienceExplanation",
            "prepTime",
            "ingredients",
            "preparationSteps",
            "usageInstructions",
            "safetyWarning"
          ],
          properties: {
            remedyName: {
              type: Type.STRING,
              description: "English name of the remedy (e.g., Warm Turmeric-Ginger Elixir).",
            },
            remedyLocalName: {
              type: Type.STRING,
              description: "Traditional local or Hinglish name (e.g., Haldi-Adrak Kadha or Saunf Digestive Tea).",
            },
            scienceExplanation: {
              type: Type.STRING,
              description: "A reassuring explanation of why this works, combining traditional Ayurvedic properties (Vata/Pitta/Kapha) and simple kitchen science in Grandma's tone.",
            },
            prepTime: {
              type: Type.STRING,
              description: "Time to prepare (e.g., '10 mins').",
            },
            ingredients: {
              type: Type.ARRAY,
              description: "Ingredients needed for the remedy.",
              items: {
                type: Type.OBJECT,
                required: ["name", "amount"],
                properties: {
                  name: {
                    type: Type.STRING,
                    description: "E.g., 'Fresh Grated Ginger (Adrak)', 'Tulsi leaves (Holy Basil)'.",
                  },
                  amount: {
                    type: Type.STRING,
                    description: "E.g., '1 inch piece', '5-6 leaves', '1/2 tsp'.",
                  },
                },
              },
            },
            preparationSteps: {
              type: Type.ARRAY,
              description: "Step-by-step preparation directions.",
              items: {
                type: Type.STRING,
              },
            },
            usageInstructions: {
              type: Type.STRING,
              description: "When to consume/apply, dose, temperature, and dietary guidelines (e.g., 'Drink warm twice a day after meals. Avoid cold water for an hour.').",
            },
            safetyWarning: {
              type: Type.STRING,
              description: "A standard wise grandma safety boundary (e.g., 'This is a home remedy for mild issues. If the fever persists for more than 48 hours, please seek medical advice from a doctor immediately.').",
            },
          },
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from Gemini API");
    }

    const remedyData = JSON.parse(text.trim());
    res.json(remedyData);
  } catch (error: any) {
    console.error("Remedy generation error:", error);
    res.status(500).json({ error: error.message || "Failed to generate remedy." });
  }
});

// Endpoint 3: Bachat (Indian Household Frugal Tips) Generator
app.post("/api/bachat-tip", async (req, res) => {
  const { vegetable, language } = req.body;

  if (!vegetable) {
    return res.status(400).json({ error: "Vegetable or ingredient name is required." });
  }

  const userLanguage = language || "English (with regional Hinglish words)";

  const prompt = `Provide practical, innovative, and traditional Indian household storage and preservation hacks ("Bachat & Sanrakshan Tips") specifically for: "${vegetable}".
Explain how to prevent spoilage in typical warm/humid Indian kitchen environments, how to revive it if it has wilted, and how to use parts that are usually thrown away (like skins, peels, stems, seeds).
The response should be in ${userLanguage}.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an expert Indian home economics advisor and traditional kitchen planner. You share smart, hyper-localized storage hacks, revival techniques, and upcycling ideas for ingredients in structured JSON.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: [
            "tipTitle",
            "storageHack",
            "revivalHack",
            "alternativeUse"
          ],
          properties: {
            tipTitle: {
              type: Type.STRING,
              description: "A catchy, warm title for this ingredient hack (e.g., 'Making Dhania Last for Weeks!').",
            },
            storageHack: {
              type: Type.STRING,
              description: "A specific, clever storage trick suitable for Indian climate (e.g., using newspaper wrap, storing in clay pots, removing stems).",
            },
            revivalHack: {
              type: Type.STRING,
              description: "How to bring it back to life if it looks sad or dry (e.g., ice-water bath, wrapping in a damp muslin cloth/malmal kapda).",
            },
            alternativeUse: {
              type: Type.STRING,
              description: "How to upcycle parts usually discarded (e.g., making coriander stem soup, potato peel chips, watermelon rind subzi).",
            },
          },
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from Gemini API");
    }

    const bachatData = JSON.parse(text.trim());
    res.json(bachatData);
  } catch (error: any) {
    console.error("Bachat tip generation error:", error);
    res.status(500).json({ error: error.message || "Failed to generate bachat tip." });
  }
});


// Serve Front-end App using Vite in dev, static server in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Mounted Vite middleware (Development mode)");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving static files from dist/ (Production mode)");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Smart Rasoi Backend running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
