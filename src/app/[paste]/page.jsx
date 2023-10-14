import PasteInput from "@/components/PasteInput";

export function getBaseUrl() {
  if (typeof window !== 'undefined') return '';
  const vc = process.env.VERCEL_URL;
  if (vc) return `https://${vc}`;

  // If we are in dev mode, this is the port we want to use.
  return 'http://localhost:3000';
}

// Function to fetch text data for a specific paste from the server
async function getText(paste) {
  const response = await fetch(`${getBaseUrl()}/api/text/?paste=${paste}`);
  const body = await response.json();
  if (response.status === 404) {
    alert(`The paste '${body.paste}' does not exist!`);
    return null;
  }
  const text = body.text;
  const language = body.language;
  return [text, language];
}

// NewPaste component that displays the editor and handles user interactions
export default async function NewPaste({ params }) {
  const [text, language] = await getText(params.paste);
  return (
    <main>
      <PasteInput
        initialButtonText="saved"
        initialLanguage={language}
        initialText={text}
      />
    </main>
  )
}
