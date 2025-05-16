// App.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [tone, setTone] = useState('ELI5');
  const [response, setResponse] = useState('');

  const handleSubmit = async () => {
    if (!prompt.trim()) return alert("Enter a prompt!");

    try {
      const res = await axios.post('http://127.0.0.1:8000/explain', {
        prompt,
        tone,
      });
      setResponse(res.data.explanation);
    } catch (error) {
      console.error(error);
      setResponse("Error occurred while fetching explanation.");
    }
  };

  return (
    <div className="App">
      <h1>🧠 Explain It with Slay</h1>
      <textarea
        placeholder="Enter topic or concept..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <select onChange={(e) => setTone(e.target.value)} value={tone}>
        <option value="ELI5">ELI5</option>
        <option value="Formal">Formal</option>
        <option value="Code-heavy">Code-heavy</option>
        <option value="Gen Alpha Brain Rot">Gen Alpha Brain Rot</option>
        <option value="Floptropica">Floptropica</option>
      </select>
      <button onClick={handleSubmit}>Explain</button>
      <div className="response-box">
        <h2>✨ Output</h2>
        <p>{response}</p>
      </div>
    </div>
  );
}

export default App;
