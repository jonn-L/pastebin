'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

async function getText(link) {
  const response = await fetch(`../api/text/?link=${link}`);
  const body = await response.json();
  const text = body.text;
  console.log(text);

  return text;
}

export default function NewLink({ params }) {    
  const router = useRouter();
  const [text, setText] = useState('');
  const [buttonLabel, setButtonLabel] = useState('SAVED');

  useEffect(async () => {
    const result = await getText(params.link);
    setText(result);
  }, []);

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
    else {
      alert('YOU MUST ENTER SOME TEXT TO SAVE');
    }
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