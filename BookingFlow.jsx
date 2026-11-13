import { useState } from "react";
import Header from "../components/Header";
import { createAppointment } from "../services/appointmentsService";
import { getTotalDurationMinutes, getTotalPrice } from "../utils/duration";
import StepProfessional from "./booking/StepProfessional";
import StepServices from "./booking/StepServices";
import StepDate from "./booking/StepDate";
import StepTime from "./booking/StepTime";
import StepReview from "./booking/StepReview";
import StepSuccess from "./booking/StepSuccess";

const INITIAL_DATA = {
  professional: null,
  services: [],
  date: null,
  time: null,
  user: { name: "", whatsapp: "" },
};

export default function BookingFlow({ user, allAppointments, onExit }) {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState(INITIAL_DATA);
  const [isSaving, setIsSaving] = useState(false);

  const nextStep = () => setStep((s) => Math.min(s + 1, 6));
  const prevStep = () => {
    if (step === 1) onExit();
    else setStep((s) => Math.max(s - 1, 1));
  };

  const handleFinalize = async () => {
    if (!user) return;
    setIsSaving(true);

    const newAppointment = {
      ...bookingData,
      totalPrice: getTotalPrice(bookingData.services),
      durationMinutes: getTotalDurationMinutes(bookingData.services),
      status: "Aguardando",
      createdAt: Date.now(),
    };

    try {
      await createAppointment(user.uid, newAppointment);
      nextStep();
    } catch (error) {
      console.error("Error saving appointment:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const common = { bookingData, setBookingData, onNext: nextStep };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {step < 6 && <Header showBack onBack={prevStep} />}
      <div className="flex-1 relative flex flex-col overflow-hidden">
        {step === 1 && <StepProfessional {...common} />}
        {step === 2 && <StepServices {...common} />}
        {step === 3 && <StepDate {...common} />}
        {step === 4 && <StepTime {...common} allAppointments={allAppointments} />}
        {step === 5 && (
          <StepReview {...common} isSaving={isSaving} onFinalize={handleFinalize} />
        )}
        {step === 6 && <StepSuccess bookingData={bookingData} onFinish={onExit} />}
      </div>
    </div>
  );
}
