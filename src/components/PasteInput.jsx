'use client';
import Editor from '@monaco-editor/react';
import { useEffect, useState } from 'react';

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

export default function PasteInput({ initialLanguage = "", initialText = "", initialButtonText = "save" }) {

    const [buttonLabel, setButtonLabel] = useState(initialButtonText);
    const [text, setText] = useState(initialText);
    const [language, setLanguage] = useState(initialLanguage);

    useEffect(() => {
      if ((text !== "") &&  (text === initialText) && (language === initialLanguage)) setButtonLabel('saved');
    }, [text]);

    function handleSubmit(e) {
        e.preventDefault();
    
        // Check if text is modified and send a POST request to save the changes
        if ((text !== '') && (buttonLabel !== 'saved')) {
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
        setButtonLabel('save');
      }
    
      function handleReset() {
        window.location.href = "/";
      }
    
      const handleLanguageChange = (language) => {
        setLanguage(language);
        setButtonLabel('save');
      }

    return <form onSubmit={handleSubmit}>
    <div className="buttons">
      <button type="reset" onClick={handleReset}>[ new ]</button>
      <button type="submit">[ {buttonLabel} ]</button>

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
  </form>;
}