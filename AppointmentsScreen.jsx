import { useState } from "react";
import { ChevronLeft, Calendar, Clock, BookHeart, Trash2, AlertCircle } from "lucide-react";

export default function AppointmentsScreen({ appointments, onBack, onDelete }) {
  const [selected, setSelected] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleDelete = async (id) => {
    try {
      await onDelete(id);
      setShowCancelModal(false);
      setSelected(null);
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  if (selected) {
    return (
      <div className="flex flex-col h-full animate-in slide-in-from-right-4 duration-300 relative">
        <div className="relative text-center pb-6 border-b border-[#3f3f3f] mb-6 flex flex-col items-center shrink-0">
          <button
            onClick={() => setSelected(null)}
            className="absolute left-0 top-1 text-[#e5989b] hover:text-[#ffb6c1] transition-colors"
          >
            <ChevronLeft size={28} />
          </button>
          <div className="flex justify-center items-center gap-2 mb-1 text-[#e5989b]">
            <BookHeart size={24} />
          </div>
          <h2 className="text-xl font-medium text-neutral-100">Detalhes</h2>
        </div>

        <div className="flex-1 bg-neutral-800/50 p-5 rounded-2xl border border-neutral-700 flex flex-col gap-4 overflow-y-auto custom-scrollbar">
          <div className="flex justify-between items-center border-b border-neutral-700 pb-4">
            <span
              className={`text-xs font-medium px-3 py-1 rounded-full ${
                selected.status === "Confirmado"
                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                  : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
              }`}
            >
              {selected.status}
            </span>
            <span className="text-neutral-400 text-xs">ID: #{selected.id.slice(-6)}</span>
          </div>

          <div>
            <p className="text-sm text-neutral-400 mb-1">Cliente:</p>
            <p className="font-medium text-neutral-200 text-lg">{selected.user.name}</p>
            <p className="text-neutral-400 text-sm">{selected.user.whatsapp}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-neutral-400 mb-1">Data:</p>
              <p className="font-medium text-neutral-200 flex items-center gap-2">
                <Calendar size={16} className="text-[#e5989b]" /> Dia {selected.date}
              </p>
            </div>
            <div>
              <p className="text-sm text-neutral-400 mb-1">Horário:</p>
              <p className="font-medium text-neutral-200 flex items-center gap-2">
                <Clock size={16} className="text-[#e5989b]" /> {selected.time}
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm text-neutral-400 mb-1">Serviços:</p>
            <div className="flex flex-col gap-2">
              {selected.services.map((s, i) => (
                <div
                  key={`det-srv-${i}`}
                  className="flex justify-between items-center bg-neutral-900/50 p-3 rounded-xl border border-neutral-700"
                >
                  <span className="text-neutral-200 text-sm">{s.name}</span>
                  <span className="text-[#e5989b] text-sm font-medium">R$ {s.price}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center border-t border-neutral-700 pt-4 mt-2">
            <span className="text-neutral-400">Total:</span>
            <span className="text-xl font-medium text-[#e5989b]">R$ {selected.totalPrice}</span>
          </div>
        </div>

        <button
          onClick={() => setShowCancelModal(true)}
          className="mt-6 flex items-center justify-center gap-2 w-full py-4 rounded-xl border-2 border-red-500/50 text-red-400 font-medium hover:bg-red-500/10 transition-all active:scale-95 shrink-0"
        >
          <Trash2 size={20} />
          Cancelar Agendamento
        </button>

        {showCancelModal && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-neutral-900 border border-neutral-700 rounded-3xl p-6 w-full max-w-[320px] text-center shadow-2xl">
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-red-400">
                <AlertCircle size={24} />
              </div>
              <h3 className="text-lg font-medium text-neutral-100 mb-2">
                Deseja realmente cancelar este agendamento?
              </h3>
              <p className="text-xs text-neutral-400 mb-6">
                Esta ação liberará o horário imediatamente para outros clientes. É obrigatório escolher uma das opções abaixo.
              </p>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => handleDelete(selected.id)}
                  className="w-full py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium transition-all shadow-lg shadow-red-500/20"
                >
                  Sim, quero cancelar
                </button>
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="w-full py-3 rounded-xl border border-neutral-700 bg-neutral-800 text-neutral-300 font-medium hover:bg-neutral-700 transition-all"
                >
                  Não, voltar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-300">
      <div className="relative text-center pb-6 border-b border-[#3f3f3f] mb-6 flex flex-col items-center shrink-0">
        <button
          onClick={onBack}
          className="absolute left-0 top-1 text-[#e5989b] hover:text-[#ffb6c1] transition-colors"
        >
          <ChevronLeft size={28} />
        </button>
        <div className="flex justify-center items-center gap-2 mb-1 text-[#e5989b]">
          <BookHeart size={24} />
        </div>
        <h2 className="text-xl font-medium text-neutral-100">Meus Agendamentos</h2>
      </div>

      <div className="flex-1 flex flex-col gap-3 overflow-y-auto custom-scrollbar pr-2 pb-4">
        {appointments.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
            <Calendar size={48} className="text-neutral-500 mb-4" />
            <p className="text-neutral-400">Você ainda não tem agendamentos.</p>
          </div>
        ) : (
          appointments.map((app) => (
            <button
              key={`app-card-${app.id}`}
              onClick={() => setSelected(app)}
              className="flex flex-col text-left bg-neutral-800/50 border border-neutral-700 rounded-2xl p-4 transition-all hover:border-[#e5989b]/50 hover:scale-[1.02] shrink-0"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-neutral-200">{app.user.name}</h3>
                <span className="text-xs font-medium text-[#e5989b] bg-[#e5989b]/10 px-2 py-1 rounded-md">
                  Dia {app.date} às {app.time}
                </span>
              </div>
              <p className="text-sm text-neutral-400 truncate">
                {app.services.map((s) => s.name).join(" + ")}
              </p>
              <div className="flex justify-between items-center mt-3 pt-3 border-t border-neutral-700/50">
                <span className="text-sm font-medium text-neutral-300">R$ {app.totalPrice}</span>
                <span className="text-xs text-neutral-500">{app.status}</span>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
