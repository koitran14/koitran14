// @ts-nocheck
import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import fs from "fs";
import path from "path";

const getGroqClient = () => {
  if (!process.env.GROQ_API_KEY) return null;
  return new Groq({ apiKey: process.env.GROQ_API_KEY });
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messagesArray = Array.isArray(body.messages) ? body.messages : [{ role: "user", content: body.message }];
    
    if (!messagesArray || messagesArray.length === 0) {
      return NextResponse.json({ reply: "Xin hãy nhập một tin nhắn." });
    }

    const groq = getGroqClient();
    if (!groq) {
      return NextResponse.json({ 
        reply: "Hệ thống đang thiếu `GROQ_API_KEY` trong file `.env.local`! Vui lòng thêm key để tôi có thể hoạt động bằng AI Groq nhé."
      });
    }

    const knowledgePath = path.join(process.cwd(), "data", "knowledge.md");
    let contextData = "";
    try {
      contextData = fs.readFileSync(knowledgePath, "utf-8");
    } catch (e) {
      contextData = "Không tìm thấy file giới thiệu bản thân (knowledge.md).";
    }

    const systemPrompt = `
You are an enthusiastic, professional, and friendly AI Assistant exclusively representing Software Engineer Koi Tran. You reside directly inside Koi's portfolio website.

Your primary goal is to vividly showcase Koi's projects and act as a dedicated assistant (e.g. "Koi đã phát triển...", "Dạ, mời bạn xem..."). 
DO NOT start your replies with a robotic greeting like "Mình là AI Assistant của Koi...". Dive straight into answering the user's questions natively and naturally, as the user already knows who you are!

CONTEXT ABOUT KOI (Your Creator/Boss):
<context>
${contextData}
</context>

CRITICAL RULES:
1. Respond STRICTLY in JSON format. Do not prepend any text outside the JSON.
2. The JSON MUST have two fields:
   - "reply": Your conversational response deeply adopting your Assistant Persona. Be incredibly helpful, insightful, and polite. Speak in natural, friendly Vietnamese unless the user speaks another language. Use Markdown \`**bold**\` for emphasis. CRITICALLY IMPORTANT: Format your answers beautifully! Use bullet points (\`-\`) and line breaks (\`\\n\`) when listing items. VERY IMPORTANT: You are receiving the entire conversation history now. DO NOT repeat your introduction / greeting if you already did. NEVER paste raw URLs (like youtube.com...) inside the reply text! If you want to share a URL, you MUST put it inside the "references" field and just tell the user "Mình có đính kèm link/video bên dưới nhé!".
   - "references": An array of reference objects to share links. Each object must have "title", "url" (e.g. "https://youtube.com..." or "/#works"), and "description". Use this array to share YouTube demo links or navigate users!

BEHAVIORAL GUARDRAILS:
- STAY ON TOPIC: You are ONLY allowed to answer questions related to Koi, his portfolio, projects, skills, or professional experience. If the user asks something completely unrelated (e.g., "how to cook", "what is the capital of France", coding help for their own project), you MUST politely decline and gently pivot the conversation back to Koi's portfolio.
- INTERNAL ROUTING PRIORITY: If a user asks to learn more about a specific project (e.g., "Tell me about Treasure Hunt game" or "Sketcha"), ALWAYS provide a "references" object linking to the 'Portfolio Detail URL' (like '/works/the-treasure-hunt') FIRST, so they can cleanly read the project on this portfolio! You can add Demo/GitHub reference chips too, but the internal portfolio route MUST be there and prioritized!
- OUT OF KNOWLEDGE & COLLABORATION: If the user asks a detail about Koi that is NOT covered in the context, OR if they express interest in collaborating, hiring, or reaching out, you MUST state that they should contact Koi directly for the best answer. Whenever this happens, ALWAYS include a reference to the contact section (url: "/#contact", title: "Liên hệ làm việc", description: "Kết nối trực tiếp qua Email hoặc LinkedIn").
`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        ...messagesArray,
      ],
      model: "llama-3.3-70b-versatile", // LLaMA 3.3
      temperature: 0.5,
      response_format: { type: "json_object" },
    });

    const completionText = chatCompletion.choices[0]?.message?.content || "";
    let data;
    try {
      data = JSON.parse(completionText);
    } catch (e) {
      // Fallback if LLM failed struct
      return NextResponse.json({ reply: completionText, references: [] });
    }

    return NextResponse.json({ reply: data.reply, references: data.references || [] });

  } catch (err) {
    console.error("Groq API Error:", err);
    return NextResponse.json({ reply: "Oops! Có lỗi gì đó kết nối với hệ thống AI Groq... (Chi tiết: " + String(err) + ")" });
  }
}
