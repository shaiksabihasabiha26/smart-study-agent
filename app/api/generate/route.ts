import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { notes } = await req.json();

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Summarize these study notes:\n\n${notes}`,
    });

    return NextResponse.json({
      summary: response.text,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        summary: "Failed to generate summary.",
      },
      { status: 500 }
    );
  }
}