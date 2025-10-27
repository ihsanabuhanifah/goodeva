export default function AIRecommendation({ text }: { text?: string | null }) {
  if (!text)
    return (
      <span className="text-muted-foreground">
        Tidak ada rekomendasi dari AI.
      </span>
    );

  return (
    <div className="mt-2 p-3 rounded-xl bg-blue-50 border border-blue-200 max-h-48 overflow-y-auto">
      <div className="whitespace-pre-line text-blue-900 text-sm leading-relaxed">
        {text
          .replace(/\*\*(.*?)\*\*/g, "$1") 
          .replace(/\*(.*?)\*/g, "$1")}  
      </div>
    </div>
  );
}
