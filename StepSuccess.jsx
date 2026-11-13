import { CheckCircle2 } from "lucide-react";

export default function StepSuccess({ bookingData, onFinish }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center animate-in zoom-in-95 duration-500 pt-10">
      <div className="w-24 h-24 bg-[#e5989b]/20 rounded-full flex items-center justify-center mb-6">
        <CheckCircle2 size={48} className="text-[#e5989b]" />
      </div>
      <h2 className="text-2xl font-medium text-[#e5989b] mb-4">
        Aguardando<br />Confirmação
      </h2>
      <p className="text-neutral-300 mb-8 max-w-[280px] text-sm">
        Seu pedido de agendamento foi enviado com sucesso! Aguarde a confirmação da nossa equipe via WhatsApp.
      </p>

      <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-4 w-full mb-8 text-left space-y-2">
        <p className="text-xs text-neutral-400">Resumo do pedido:</p>
        <p className="text-sm text-neutral-200">
          <strong>Serviços:</strong> {bookingData.services.map((s) => s.name).join(", ")}
        </p>
        <p className="text-sm text-neutral-200">
          <strong>Profissional:</strong> {bookingData.professional?.name}
        </p>
        <p className="text-sm text-neutral-200">
          <strong>Data:</strong> Dia {bookingData.date} às {bookingData.time}
        </p>
      </div>

      <button
        onClick={onFinish}
        className="w-full mt-auto py-4 rounded-xl border-2 border-[#e5989b] text-[#e5989b] font-medium hover:bg-[#e5989b] hover:text-neutral-900 transition-all active:scale-95 hover:scale-[1.02] shrink-0"
      >
        Voltar ao Início
      </button>
    </div>
  );
}
