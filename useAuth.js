import { useEffect, useState } from "react";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { auth } from "../config/firebase";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setAuthLoading(false);
        return;
      }
      try {
        await signInAnonymously(auth);
      } catch (error) {
        console.error("Auth error:", error);
        setAuthLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  return { user, authLoading };
}
