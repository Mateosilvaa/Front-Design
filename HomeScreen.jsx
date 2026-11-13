import {
  Calendar, MessageCircle, Instagram, MapPin, Image as ImageIcon, BookHeart,
} from "lucide-react";
import Header from "../components/Header";

export default function HomeScreen({ onBook, onAppointments }) {
  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      <Header />

      <div className="flex-1 flex flex-col gap-4 mt-2 overflow-y-auto custom-scrollbar pr-1">
        <button
          onClick={onBook}
          className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-gradient-to-r from-[#e5989b] to-[#ffb6c1] text-neutral-900 font-semibold text-lg transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-[#e5989b]/20 shrink-0"
        >
          <Calendar size={20} />
          Agendar Serviços
        </button>

        <button
          onClick={onAppointments}
          className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl border border-neutral-700 bg-neutral-800/50 text-neutral-200 font-medium hover:border-[#e5989b]/50 transition-all hover:scale-[1.02] active:scale-95 shrink-0"
        >
          <BookHeart size={20} className="text-[#e5989b]" />
          Meus Agendamentos
        </button>

        <a
          href="https://www.instagram.com/p/DeJ19MeRPu4/?utm_source=ig_web_copy_link&mdxt=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA=="
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl border border-neutral-700 bg-neutral-800/50 text-neutral-200 font-medium hover:border-[#e5989b]/50 transition-all hover:scale-[1.02] active:scale-95 shrink-0"
        >
          <ImageIcon size={20} className="text-[#e5989b]" />
          Trabalhos Realizados
        </a>

        <div className="mt-8 shrink-0 pb-4">
          <h3 className="text-sm font-medium text-neutral-400 text-center mb-4 uppercase tracking-wider">
            Nossas Redes e Contato
          </h3>
          <div className="grid grid-cols-1 gap-3">
            <a
              href="https://wa.me/5519988958815"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 w-full p-4 rounded-xl border border-neutral-700 bg-neutral-900/50 hover:bg-[#e5989b]/10 hover:border-[#e5989b]/50 transition-all hover:scale-[1.02]"
            >
              <MessageCircle className="text-green-400" size={24} />
              <span className="text-neutral-300 font-medium">WhatsApp</span>
            </a>
            <a
              href="https://www.instagram.com/lash_jucaram/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 w-full p-4 rounded-xl border border-neutral-700 bg-neutral-900/50 hover:bg-[#e5989b]/10 hover:border-[#e5989b]/50 transition-all hover:scale-[1.02]"
            >
              <Instagram className="text-[#e5989b]" size={24} />
              <span className="text-neutral-300 font-medium">Instagram</span>
            </a>
            <button className="flex items-center gap-3 w-full p-4 rounded-xl border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-800 transition-all hover:scale-[1.02]">
              <MapPin className="text-blue-400" size={24} />
              <span className="text-neutral-300 font-medium">Como Chegar (Maps)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
