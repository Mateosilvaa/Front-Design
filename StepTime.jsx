import { Calendar, Clock } from "lucide-react";
import { ALL_TIME_SLOTS, SATURDAY_LAST_SLOT } from "../../constants/data";
import { getCalendarInfo, getDayOfWeek, timeToMinutes } from "../../utils/date";
import { getTotalDurationMinutes } from "../../utils/duration";

export default function StepTime({ bookingData, setBookingData, onNext, allAppointments }) {
  const now = new Date();
  const { year, month, today } = getCalendarInfo(now);
  const dayOfWeek = getDayOfWeek(year, month, bookingData.date);
  const duration = getTotalDurationMinutes(bookingData.services);
  const bookedOnThisDay = allAppointments.filter((app) => app.date === bookingData.date);

  const isSlotDisabled = (time) => {
    const slotStart = timeToMinutes(time);

    // Sábado: atende até 15:00
    if (dayOfWeek === 6 && slotStart > timeToMinutes(SATURDAY_LAST_SLOT)) return true;

    // Horários que já passaram, se o dia escolhido for hoje
    if (bookingData.date === today) {
      const currentMins = now.getHours() * 60 + now.getMinutes();
      if (slotStart <= currentMins) return true;
    }

    // Conflito com horários já reservados
    const slotEnd = slotStart + duration;
    for (const booked of bookedOnThisDay) {
      if (!booked.time) continue;
      const bookedStart = timeToMinutes(booked.time);
      const bookedEnd = bookedStart + (booked.durationMinutes || 60);
      if (slotStart < bookedEnd && slotEnd > bookedStart) return true;
    }

    return false;
  };

  return (
    <div className="flex flex-col h-full animate-in slide-in-from-right-4 duration-300">
      <h2 className="text-xl font-medium text-center mb-2 text-neutral-100 shrink-0">
        Escolha o Horário
      </h2>
      <p className="text-center text-[#e5989b] text-sm mb-6 flex items-center justify-center gap-2 shrink-0">
        <Calendar size={16} /> Dia {bookingData.date} • Duração: ~{duration} min
      </p>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 pb-4">
        <div className="grid grid-cols-2 gap-4">
          {ALL_TIME_SLOTS.map((t) => {
            const disabled = isSlotDisabled(t);
            const isSelected = bookingData.time === t;

            return (
              <button
                key={`time-${t}`}
                disabled={disabled}
                onClick={() => setBookingData({ ...bookingData, time: t })}
                className={`py-4 rounded-xl border flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] ${
                  disabled
                    ? "opacity-20 cursor-not-allowed border-neutral-800 bg-neutral-900/30 text-neutral-500"
                    : isSelected
                    ? "border-[#e5989b] bg-[#e5989b] text-neutral-900 font-semibold shadow-md scale-105"
                    : "border-neutral-700 bg-neutral-800/50 text-neutral-300 hover:border-neutral-500 hover:scale-105"
                }`}
              >
                <Clock
                  size={18}
                  className={
                    disabled ? "text-neutral-600" : isSelected ? "text-neutral-900" : "text-[#e5989b]"
                  }
                />
                {t}
                {disabled && (
                  <span className="text-[10px] ml-1 text-red-400 font-normal">(Indisponível)</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
      <button
        onClick={onNext}
        disabled={!bookingData.time}
        className="mt-6 w-full py-4 rounded-xl bg-gradient-to-r from-[#e5989b] to-[#ffb6c1] text-neutral-900 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-[#e5989b]/20 shrink-0"
      >
        Avançar
      </button>
    </div>
  );
}
