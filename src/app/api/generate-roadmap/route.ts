import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { formData } = await req.json();
    const genAI = new GoogleGenerativeAI("AIzaSyAHB8HN5z2ldm0YPmqxqx7MLn7FLBomJUg");
    
    // Using 1.5 Flash for better reliability and quota
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `You are an IELTS expert. Based on this data: ${JSON.stringify(formData)}, generate a comprehensive weekly roadmap in JSON format. The JSON must include: summary, targetBand, and weeklyPlan (an array of weeks with title, focus, and tasks).`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return NextResponse.json(JSON.parse(text));
  } catch (error: any) {
    console.error("Roadmap Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
