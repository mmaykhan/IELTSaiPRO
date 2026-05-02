import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { englishLevel, targetBand, timeUntilExam, weeklyHours, strugglingSection } = data;

    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return NextResponse.json({ error: 'API Key is missing in environment variables' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `You are an expert IELTS Tutor. Use the provided user data to create a detailed, week-by-week IELTS study roadmap in professional Markdown format. Include specific tips for their weakest section.

User Data:
- Current English Level: ${englishLevel || "Not specified"}
- Target IELTS Band: ${targetBand || "Not specified"}
- Time Until Exam: ${timeUntilExam || "Not specified"}
- Weekly Study Hours: ${weeklyHours || "Not specified"}
- Weakest Section: ${strugglingSection || "Not specified"}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return NextResponse.json({ roadmap: text });
  } catch (error: any) {
    console.error("Error generating roadmap:", error);
    return NextResponse.json({ error: error.message || "Failed to generate roadmap" }, { status: 500 });
  }
}
