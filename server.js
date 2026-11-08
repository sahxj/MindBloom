
import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "20kb" }));
app.use(express.static("."));

app.get("/", (req, res) => {
    res.sendFile(process.cwd() + "/chat.html");
});

if (!process.env.GEMINI_API_KEY) {
    console.error("Missing GEMINI_API_KEY in .env");
    process.exit(1);
}

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const squirrelPersonality = `
You are Squirrel, the friendly reflection companion in MindBloom.

Your personality:
- Warm, gentle, patient, and encouraging.
- Speak naturally, like a supportive companion.
- Keep replies fairly short and easy to understand.
- Help users organize their thoughts and reflect.
- Ask thoughtful questions when appropriate.
- Never judge, shame, or pressure the user.
- Do not diagnose conditions or claim to provide therapy.
- You are not a replacement for professional support.
- If someone describes being in immediate danger, encourage
  them to contact a trusted adult or local emergency services.
- Do not pretend to be human.
`;

app.post("/api/chat", async (req, res) => {
    try {
        const messages = req.body.messages;

        if (!Array.isArray(messages) || messages.length === 0) {
            return res.status(400).json({
                error: "Please send a message."
            });
        }

        // Keep only recent, valid messages.
        const history = messages.slice(-16)
            .filter(message =>
                ["user", "model"].includes(message.role) &&
                typeof message.text === "string"
            )
            .map(message => ({
                role: message.role,
                parts: [{ text: message.text.slice(0, 3000) }]
            }));

        if (!history.length || history[history.length - 1].role !== "user") {
            return res.status(400).json({
                error: "Your latest message is missing."
            });
        }

        const response = await ai.models.generateContent({
            model: "gemini-3.8-flash",
            contents: history,
            config: {
                systemInstruction: squirrelPersonality,
                maxOutputTokens: 400
            }
        });

        res.json({
            reply: response.text || "I'm here to listen. Would you like to tell me a little more?"
        });

    } catch (error) {
        console.error("Gemini error:", error);

        res.status(500).json({
            error: "Squirrel couldn't respond right now. Please try again."
        });
    }
});

app.listen(PORT, () => {
    console.log(`MindBloom is running at http://localhost:${PORT}`);
});
