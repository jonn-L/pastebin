import PasteInput from "@/components/PasteInput";

export default async function Home() {
  return (
    <main>
      <PasteInput 
        initialButtonText="save"
        initialLanguage="plain"
        initialText=""
      />
    </main>
  )
}
