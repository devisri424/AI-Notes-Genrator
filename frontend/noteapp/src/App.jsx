import { useState } from "react";
import "./App.css";

function App() {
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const generateNotes = async () => {
    if (!topic.trim()) {
      setNotes("Please enter a topic first.");
      return;
    }

    setLoading(true);
    setNotes("Generating notes...");

    try {
      const response = await fetch("https://ai-notes-genrator.onrender.com/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic }),
      });

      const data = await response.json();
      setNotes(data.notes || data.error);
    } catch (error) {
      setNotes("Error connecting to backend");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">📘 AI Notes Generator</h1>
        <p className="subtitle">
          Enter a topic and generate smart AI notes instantly 
        </p>

        <textarea
          className="textarea"
          rows="5"
          placeholder="Enter your topic..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />

        <button
          className="button"
          onClick={generateNotes}
          disabled={loading}
        >
          {loading ? "Generating..." : " Generate Notes"}
        </button>

        <div className="outputBox">
          <pre className="outputText">{notes}</pre>
        </div>
      </div>
    </div>
  );
}

export default App;