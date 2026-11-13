import { User, Check } from "lucide-react";
import { PROFESSIONALS } from "../../constants/data";

export default function StepProfessional({ bookingData, setBookingData, onNext }) {
  return (
    <div className="flex flex-col h-full animate-in slide-in-from-right-4 duration-300">
      <h2 className="text-xl font-medium text-center mb-6 text-neutral-100 shrink-0">
        Escolha a Profissional
      </h2>
      <div className="flex flex-col gap-4 flex-1">
        {PROFESSIONALS.map((p) => (
          <button
            key={p.id}
            onClick={() => setBookingData({ ...bookingData, professional: p })}
            className={`flex items-center p-4 rounded-2xl border transition-all duration-300 hover:scale-[1.02] text-left ${
              bookingData.professional?.id === p.id
                ? "border-[#e5989b] bg-[#e5989b]/10 shadow-[0_0_15px_rgba(229,152,155,0.1)]"
                : "border-neutral-700 bg-neutral-800/50 hover:border-neutral-500"
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-neutral-700 flex items-center justify-center mr-4 text-neutral-400">
              <User size={24} />
            </div>
            <div className="flex-1">
              <h3
                className={`font-medium text-lg ${
                  bookingData.professional?.id === p.id ? "text-[#e5989b]" : "text-neutral-200"
                }`}
              >
                {p.name}
              </h3>
              <p className="text-neutral-400 text-sm">
                {p.role} • {p.available ? "Disponível" : "Indisponível"}
              </p>
            </div>
            {bookingData.professional?.id === p.id && (
              <Check className="text-[#e5989b]" size={20} />
            )}
          </button>
        ))}
      </div>
      <button
        onClick={onNext}
        disabled={!bookingData.professional}
        className="mt-6 w-full py-4 rounded-xl bg-gradient-to-r from-[#e5989b] to-[#ffb6c1] text-neutral-900 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-[1.02] active:scale-95 shrink-0"
      >
        Avançar
      </button>
    </div>
  );
}
