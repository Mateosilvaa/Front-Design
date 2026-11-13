import { Loader2 } from "lucide-react";
import { getTotalPrice } from "../../utils/duration";

const inputClass =
  "w-full bg-neutral-900/50 border border-neutral-700 rounded-xl p-3 text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:border-[#e5989b] transition-colors";

export default function StepReview({ bookingData, setBookingData, isSaving, onFinalize }) {
  const totalPrice = getTotalPrice(bookingData.services);

  const setUserField = (field, value) =>
    setBookingData({ ...bookingData, user: { ...bookingData.user, [field]: value } });

  const invalid =
    bookingData.user.name.trim().length < 2 ||
    bookingData.user.whatsapp.replace(/\D/g, "").length < 9 ||
    isSaving;

  return (
    <div className="flex flex-col h-full animate-in slide-in-from-right-4 duration-300">
      <h2 className="text-xl font-medium text-center mb-6 text-neutral-100 shrink-0">
        Revise seu Agendamento
      </h2>

      <div className="bg-neutral-800/50 p-5 rounded-2xl border border-neutral-700 flex-1 flex flex-col gap-4 overflow-y-auto custom-scrollbar pr-2">
        <div className="flex justify-between items-start border-b border-neutral-700 pb-4 shrink-0">
          <div>
            <p className="text-sm text-neutral-400 mb-1">Serviços:</p>
            {bookingData.services.map((s, idx) => (
              <p key={`rev-srv-${idx}`} className="font-medium text-neutral-200">
                {s.name}
              </p>
            ))}
          </div>
          <div className="text-right shrink-0">
            <p className="text-sm text-neutral-400 mb-1">Valor Total:</p>
            <p className="font-medium text-[#e5989b]">R$ {totalPrice}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 border-b border-neutral-700 pb-4 shrink-0">
          <div>
            <p className="text-sm text-neutral-400 mb-1">Profissional:</p>
            <p className="font-medium text-neutral-200">{bookingData.professional?.name}</p>
          </div>
          <div>
            <p className="text-sm text-neutral-400 mb-1">Data e Hora:</p>
            <p className="font-medium text-neutral-200">
              Dia {bookingData.date} às {bookingData.time}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 shrink-0 pb-4 mt-2">
          <div>
            <label className="text-sm text-neutral-400 mb-1 block">Seu Nome</label>
            <input
              type="text"
              placeholder="Como gosta de ser chamada?"
              value={bookingData.user.name}
              onChange={(e) => setUserField("name", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-sm text-neutral-400 mb-1 block">Seu WhatsApp</label>
            <input
              type="tel"
              placeholder="(ex: XX XXXXX-XXXX)"
              value={bookingData.user.whatsapp}
              onChange={(e) => setUserField("whatsapp", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <button
        onClick={onFinalize}
        disabled={invalid}
        className="mt-6 w-full py-4 rounded-xl flex items-center justify-center gap-2 bg-gradient-to-r from-[#e5989b] to-[#ffb6c1] text-neutral-900 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-[#e5989b]/20 shrink-0"
      >
        {isSaving ? (
          <>
            <Loader2 size={20} className="animate-spin" /> Salvando...
          </>
        ) : (
          "Finalizar Agendamento"
        )}
      </button>
    </div>
  );
}
