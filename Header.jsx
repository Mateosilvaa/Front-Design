import { ChevronLeft, Sparkles } from "lucide-react";

export default function Header({ showBack = false, onBack }) {
  return (
    <div className="relative text-center pb-6 border-b border-[#3f3f3f] mb-6 flex flex-col items-center shrink-0">
      {showBack && (
        <button
          onClick={onBack}
          className="absolute left-0 top-1 text-[#e5989b] hover:text-[#ffb6c1] transition-colors"
        >
          <ChevronLeft size={28} />
        </button>
      )}
      <div className="flex justify-center items-center gap-2 mb-1 text-[#e5989b]">
        <Sparkles size={24} />
      </div>
      <h1 className="text-3xl text-[#e5989b] tracking-wide" style={{ fontFamily: "cursive" }}>
        𝒥𝓊 𝒞𝒶𝓇𝒶𝓂 | 𝒞𝒾́𝓁𝒾ℴ𝓈
      </h1>
      <p className="text-sm text-neutral-400 font-light tracking-widest uppercase mt-1">
        Cílios & Sobrancelhas
      </p>
    </div>
  );
}
