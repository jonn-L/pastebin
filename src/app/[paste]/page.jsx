'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

async function getText(paste) {
  const response = await fetch(`../../api/text/?paste=${paste}`);
  const body = await response.json();
  if (response.status === 404) {
    alert(`The paste '${body.paste}' does not exist!`);
    return null;
  }
  const text = body.text;

  return text;
}

export default function NewPaste({ params }) {    
  const router = useRouter();
  const [initialText, setInitialText] = useState('');
  const [text, setText] = useState('');
  const [buttonLabel, setButtonLabel] = useState('SAVED');

  useEffect(async () => {
    const result = await getText(params.paste);

    if (result === null) router.push('/');

    setText(result);
    setInitialText(result);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setText(e.target.value);

    if ((text !== '') && (text !== initialText)) {
      fetch("/api/submit/", {
        method: "POST",
        body: JSON.stringify({ text: text })
      })
      .then(async response => {
        const data = await response.json();
        console.log(data);
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