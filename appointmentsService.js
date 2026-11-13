import {
  addDoc, collection, deleteDoc, doc, onSnapshot, setDoc,
} from "firebase/firestore";
import { db, APP_ID } from "../config/firebase";

const userCol = (uid) =>
  collection(db, "artifacts", APP_ID, "users", uid, "appointments");
const userDoc = (uid, id) =>
  doc(db, "artifacts", APP_ID, "users", uid, "appointments", id);
const globalCol = () =>
  collection(db, "artifacts", APP_ID, "public", "data", "all_appointments");
const globalDoc = (id) =>
  doc(db, "artifacts", APP_ID, "public", "data", "all_appointments", id);

const mapDocs = (snapshot) =>
  snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));

export function subscribeUserAppointments(uid, callback) {
  return onSnapshot(
    userCol(uid),
    (snapshot) => {
      const apps = mapDocs(snapshot);
      apps.sort((a, b) => b.createdAt - a.createdAt);
      callback(apps);
    },
    (error) => console.error("Error fetching user appointments:", error)
  );
}

export function subscribeAllAppointments(callback) {
  return onSnapshot(
    globalCol(),
    (snapshot) => callback(mapDocs(snapshot)),
    (error) => console.error("Error fetching global appointments:", error)
  );
}

export async function createAppointment(uid, data) {
  const ref = await addDoc(userCol(uid), data);
  await setDoc(globalDoc(ref.id), data);
  return ref.id;
}

export async function deleteAppointment(uid, id) {
  await deleteDoc(userDoc(uid, id));
  await deleteDoc(globalDoc(id));
}
