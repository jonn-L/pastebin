'use client'
import { useState } from "react";
import Editor from '@monaco-editor/react';

// List of supported programming languages for the editor
const supportedLanguages = [
  'javascript',
  'typescript',
  'html',
  'css',
  'cpp',
  'python',
  'java',
  'go',
  'markdown',
  'dockerfile',
  'plain'
];

export default function Home() {
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('plain');

  function handleSubmit(e) {
    e.preventDefault();
    // Check if there is text to save and send a POST request to the server
    if (text !== '') {
      fetch("/api/submit/", {
        method: "POST",
        body: JSON.stringify({ text: text, language: language })
      })
      .then(async response => {
        const data = await response.json();
        const paste = data.paste;
        const host = window.location.host;
        await navigator.clipboard.writeText(`${host}/${paste}`);
        window.location.href = `/${paste}`;
      })
      .catch(err => {
        console.error(err);
      });
    }
  }

  function handleTextChange(text) {
    setText(text);
  }

  function handleReset() {
    setText('');
  }

  const handleLanguageChange = (language) => {
    setLanguage(language);
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <div className="buttons">
          <button type="reset" onClick={handleReset}>[ new ]</button>
          <button type="submit">[ save ]</button>

          {/* Dropdown for selecting the programming language */}
          <div className="dropdown">
            <button>[ language : {language} ]</button>
            <div className="dropdown-content">
              {/* Display supported languages as options in the dropdown */}
              {supportedLanguages.map((language) => (
                <button type="button" key={language} onClick={() => handleLanguageChange(language)}>
                  {language}
                </button>
              ))}
            </div>
          </div> 
        </div>
        
        {/* Code editor component */}
        <Editor 
          className="textarea" 
          onChange={handleTextChange}
          value={text}
          theme="vs-dark" 
          language={language}
        />
      </form>
    </main>
  )
}
