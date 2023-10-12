'use client'
import { useState, useEffect } from "react";
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

// Function to fetch text data for a specific paste from the server
async function getText(paste) {
  const response = await fetch(`/api/text/?paste=${paste}`);
  const body = await response.json();
  if (response.status === 404) {
    alert(`The paste '${body.paste}' does not exist!`);
    return null;
  }
  const text = body.text;
  return text;
}

// NewPaste component that displays the editor and handles user interactions
export default function NewPaste({ params }) {
  const [initialText, setInitialText] = useState('');
  const [text, setText] = useState('');
  const [buttonLabel, setButtonLabel] = useState('saved');
  const [language, setLanguage] = useState('plain');

  // Effect hook to fetch and set initial text when the component mounts
  useEffect(() => {
    (async () => {
      const result = await getText(params.paste);

    if (result === null) window.location.href = "/";

      setText(result);
      setInitialText(result);
    })();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    // Check if text is modified and send a POST request to save the changes
    if ((text !== '') && (text !== initialText)) {
      fetch("/api/submit/", {
        method: "POST",
        body: JSON.stringify({ text: text })
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
    setButtonLabel('save');
    if (text === initialText) setButtonLabel('saved');
  }

  function handleReset() {
    window.location.href = "/";
  }

  const handleLanguageChange = (language) => {
    setLanguage(language);
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <div className="buttons">
          <button type="reset" onClick={handleReset}>[ new ]</button>
          <button type="submit">[ {buttonLabel} ]</button>

          {/* Dropdown for selecting the programming language */}
          <div className="dropdown">
            <button>[ language : {language} ]</button>
            <div className="dropdown-content">
              {/* Display supported languages as options in the dropdown */}
              {supportedLanguages.map((language) => (
                <button key={language} onClick={() => handleLanguageChange(language)}>
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
