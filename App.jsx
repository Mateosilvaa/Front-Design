import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useAuth } from "./hooks/useAuth";
import { useAppointments } from "./hooks/useAppointments";
import { deleteAppointment } from "./services/appointmentsService";
import PhoneFrame from "./components/PhoneFrame";
import HomeScreen from "./screens/HomeScreen";
import AppointmentsScreen from "./screens/AppointmentsScreen";
import BookingFlow from "./screens/BookingFlow";

export default function App() {
  const { user, authLoading } = useAuth();
  const { appointments, allAppointments } = useAppointments(user);
  const [screen, setScreen] = useState("home"); // 'home' | 'booking' | 'appointments'

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center p-4">
        <Loader2 className="animate-spin text-[#e5989b]" size={48} />
      </div>
    );
  }

  return (
    <PhoneFrame>
      {screen === "home" && (
        <HomeScreen
          onBook={() => setScreen("booking")}
          onAppointments={() => setScreen("appointments")}
        />
      )}
      {screen === "appointments" && (
        <AppointmentsScreen
          appointments={appointments}
          onBack={() => setScreen("home")}
          onDelete={(id) => deleteAppointment(user.uid, id)}
        />
      )}
      {screen === "booking" && (
        <BookingFlow
          user={user}
          allAppointments={allAppointments}
          onExit={() => setScreen("home")}
        />
      )}
    </PhoneFrame>
  );
}
