'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [text, setText] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setText(e.target.value);

    router.push('GENI', text);
  }

  function handleTextChange(e) {
    setText(e.target.value);
  }

  function handleReset(e) {
    setText('');
  }

  return (
    <main>

      <form onSubmit={handleSubmit}>
        <div className="buttons">
        <button type="reset" onClick={handleReset}>NEW</button>
        <button type="submit">SAVE</button>
        </div>
        
        <textarea value={text} onChange={handleTextChange}></textarea>
      </form>

    </main>
  )
}
