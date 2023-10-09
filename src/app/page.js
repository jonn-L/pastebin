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
        // console.log(data);
        const link = data.link;
        if (router) {
          router.push(`/${link}`);
        }
      })
      .catch(err => {
        console.error(err);
      });
    }
    else {
      alert('You must enter something before saving');
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