import { MONTH_NAMES } from "../../constants/data";
import { getCalendarInfo, getDayOfWeek } from "../../utils/date";

export default function StepDate({ bookingData, setBookingData, onNext }) {
  const { year, month, today, daysInMonth, startOffset } = getCalendarInfo();

  return (
    <div className="flex flex-col h-full animate-in slide-in-from-right-4 duration-300">
      <h2 className="text-xl font-medium text-center mb-6 text-neutral-100 shrink-0">
        Escolha a Data
      </h2>
      <div className="bg-neutral-800/50 p-4 rounded-2xl border border-neutral-700 flex-1 flex flex-col justify-center shrink-0">
        <h3 className="text-center font-medium text-[#e5989b] mb-4">{MONTH_NAMES[month]}</h3>
        <div className="grid grid-cols-7 gap-1 text-center text-xs text-neutral-400 mb-2">
          {["D", "S", "T", "Q", "Q", "S", "S"].map((d, i) => (
            <div key={`weekday-${i}`}>{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: startOffset }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const isSelected = bookingData.date === day;
            const isSunday = getDayOfWeek(year, month, day) === 0;
            const isPastDay = day < today;
            const isDisabled = isSunday || isPastDay;

            return (
              <button
                key={`day-${day}`}
                disabled={isDisabled}
                onClick={() => setBookingData({ ...bookingData, date: day, time: null })}
                className={`aspect-square rounded-full flex items-center justify-center text-sm transition-all ${
                  isDisabled
                    ? "opacity-20 cursor-not-allowed text-neutral-500"
                    : isSelected
                    ? "bg-[#e5989b] text-neutral-900 font-bold shadow-md scale-110"
                    : "text-neutral-200 hover:bg-neutral-700 hover:scale-110"
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
      <button
        onClick={onNext}
        disabled={!bookingData.date}
        className="mt-6 w-full py-4 rounded-xl bg-gradient-to-r from-[#e5989b] to-[#ffb6c1] text-neutral-900 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-[1.02] active:scale-95 shrink-0"
      >
        Avançar
      </button>
    </div>
  );
}
