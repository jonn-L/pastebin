'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewLink() {    
  const router = useRouter();
  const [text, setText] = useState('');
  const [buttonLabel, setButtonLabel] = useState('SAVED');

  function handleSubmit(e) {
    e.preventDefault();
    setText(e.target.value);

    fetch("/api/submit/", {
      method: "POST",
      body: JSON.stringify({ text: text })
    })
    .then(async response => {
      const data = await response.json();
      console.log(data);
      const link = data.link;
      if (router) {
        router.push(`/${link}`);
      }
    })
    .catch(err => {
      console.error(err);
    });
  }

  function handleTextChange(e) {
    setText(e.target.value);
    setButtonLabel('SAVE');
  }

  function handleReset() {
    router.push('/');
  }

  return (
    <main>

      <form onSubmit={handleSubmit}>
        <div className="buttons">
        <button type="reset" onClick={handleReset}>[ NEW ]</button>
        <button type="submit">[ {buttonLabel} ]</button>
        </div>
        
        <textarea value={text} onChange={handleTextChange}></textarea>
      </form>

    </main>
  )
}