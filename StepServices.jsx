import { Check } from "lucide-react";
import { SERVICES } from "../../constants/data";

export default function StepServices({ bookingData, setBookingData, onNext }) {
  const toggleService = (service) => {
    setBookingData((prev) => {
      const isSelected = prev.services.some((s) => s.id === service.id);
      return {
        ...prev,
        services: isSelected
          ? prev.services.filter((s) => s.id !== service.id)
          : [...prev.services, service],
      };
    });
  };

  return (
    <div className="flex flex-col h-full animate-in slide-in-from-right-4 duration-300">
      <h2 className="text-xl font-medium text-center mb-1 text-neutral-100 shrink-0">
        Selecione os Serviços
      </h2>
      <p className="text-sm text-[#e5989b] text-center mb-5 shrink-0">
        Você pode escolher mais de uma opção
      </p>

      <div className="flex flex-col gap-4 flex-1 overflow-y-auto custom-scrollbar pr-2">
        {SERVICES.map((s) => {
          const isSelected = bookingData.services.some((sel) => sel.id === s.id);
          return (
            <button
              key={s.id}
              onClick={() => toggleService(s)}
              className={`flex items-center p-4 rounded-2xl border transition-all duration-300 hover:scale-[1.02] text-left shrink-0 ${
                isSelected
                  ? "border-[#e5989b] bg-[#e5989b]/10 shadow-[0_0_15px_rgba(229,152,155,0.1)]"
                  : "border-neutral-700 bg-neutral-800/50 hover:border-neutral-500"
              }`}
            >
              <div className="text-3xl mr-4">{s.icon}</div>
              <div className="flex-1">
                <h3 className={`font-medium ${isSelected ? "text-[#e5989b]" : "text-neutral-200"}`}>
                  {s.name}
                </h3>
                <p className="text-neutral-400 text-sm mt-1">
                  R$ {s.price} • {s.duration}
                </p>
              </div>
              {isSelected && <Check className="text-[#e5989b]" size={20} />}
            </button>
          );
        })}
      </div>
      <button
        onClick={onNext}
        disabled={bookingData.services.length === 0}
        className="mt-6 w-full py-4 rounded-xl bg-gradient-to-r from-[#e5989b] to-[#ffb6c1] text-neutral-900 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-[1.02] active:scale-95 shrink-0"
      >
        Avançar
      </button>
    </div>
  );
}
