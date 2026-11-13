import { useEffect, useState } from "react";
import {
  subscribeUserAppointments,
  subscribeAllAppointments,
} from "../services/appointmentsService";

export function useAppointments(user) {
  const [appointments, setAppointments] = useState([]);
  const [allAppointments, setAllAppointments] = useState([]);
  const uid = user?.uid;

  useEffect(() => {
    if (!uid) {
      setAppointments([]);
      setAllAppointments([]);
      return;
    }
    const unsubUser = subscribeUserAppointments(uid, setAppointments);
    const unsubAll = subscribeAllAppointments(setAllAppointments);
    return () => {
      unsubUser();
      unsubAll();
    };
  }, [uid]);

  return { appointments, allAppointments };
}
