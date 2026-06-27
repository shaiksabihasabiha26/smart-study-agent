"use client";

import { useState } from "react";

export default function Home() {
  const [notes, setNotes] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const generateSummary = async () => {
    if (!notes.trim()) {
      setOutput("Please enter some study notes first.");
      return;
    }

    setLoading(true);
    setOutput("");

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
    } finally {
      setLoading(false);
    }
  };

  const generateQuiz = async () => {
    if (!notes.trim()) {
      setOutput("Please enter some study notes first.");
      return;
    }

    setLoading(true);
    setOutput("");

    try {
      const response = await fetch("/api/quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notes }),
      });

      const data = await response.json();
      setOutput(data.quiz);
    } catch (error) {
      console.error(error);
      setOutput("Failed to generate quiz.");
    } finally {
      setLoading(false);
    }
  };

  const generateFlashcards = async () => {
    if (!notes.trim()) {
      setOutput("Please enter some study notes first.");
      return;
    }

    setLoading(true);
    setOutput("");

    try {
      const response = await fetch("/api/flashcards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notes }),
      });

      const data = await response.json();
      setOutput(data.flashcards);
    } catch (error) {
      console.error(error);
      setOutput("Failed to generate flashcards.");
    } finally {
      setLoading(false);
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

        <div className="flex gap-4 mt-4 flex-wrap">
          <button
            onClick={generateSummary}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg disabled:bg-gray-400"
          >
            {loading ? "Generating..." : "Generate Summary"}
          </button>

          <button
            onClick={generateQuiz}
            disabled={loading}
            className="px-6 py-3 bg-green-600 text-white rounded-lg disabled:bg-gray-400"
          >
            {loading ? "Generating..." : "Generate Quiz"}
          </button>

          <button
            onClick={generateFlashcards}
            disabled={loading}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg disabled:bg-gray-400"
          >
            {loading ? "Generating..." : "Generate Flashcards"}
          </button>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Output</h2>

          <pre className="whitespace-pre-wrap">
            {output || "Your AI-generated results will appear here."}
          </pre>
        </div>
      </div>
    </main>
  );
}