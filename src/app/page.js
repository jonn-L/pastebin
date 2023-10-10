'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [text, setText] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setText(e.target.value);

    if (text !== '') {
      fetch("/api/submit/", {
        method: "POST",
        body: JSON.stringify({ text: text })
      })
      .then(async response => {
        const data = await response.json();
        const paste = data.paste;
        if (router) {
          router.push(`/${paste}`);
        }
      })
      .catch(err => {
        console.error(err);
      });
    }
  }

  function handleTextChange(e) {
    setText(e.target.value);
  }

  function handleReset() {
    setText('');
  }

  return (
    <main>

      <form onSubmit={handleSubmit}>
        <div className="buttons">
        <button type="reset" onClick={handleReset}>[ NEW ]</button>
        <button type="submit">[ SAVE ]</button>
        </div>
        
        <textarea value={text} onChange={handleTextChange}></textarea>
      </form>

    </main>
  )
}