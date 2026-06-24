"use client";

import { useState } from "react";

export default function Home() {
  const [notes, setNotes] = useState("");
  const [output, setOutput] = useState("");

  const generateSummary = async () => {
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notes }),
      });

      const data = await response.json();
      setOutput(data.summary);
    } catch (error) {
      console.error(error);
      setOutput("Failed to generate summary.");
    }
  };

  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-4xl font-bold text-center mb-8">
        Smart Study Agent
      </h1>

      <div className="max-w-3xl mx-auto">
        <textarea
          className="w-full h-64 p-4 border rounded-lg"
          placeholder="Paste your notes here..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <button
          onClick={generateSummary}
          className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg"
        >
          Generate
        </button>

        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Output</h2>
          <p>{output || "Your AI-generated results will appear here."}</p>
        </div>
      </div>
    </main>
  );
}