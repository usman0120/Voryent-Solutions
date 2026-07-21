import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { collection, query, orderBy, limit, getDocs, updateDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "application" | "contact" | "system";
  isRead: boolean;
  createdAt: any;
  link?: string;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "notifications"),
      orderBy("createdAt", "desc"),
      limit(20)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Notification[];
      setNotifications(data);
      setIsLoading(false);
    }, (error) => {
      console.error("Error fetching notifications:", error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { data: notifications, isLoading };
}

export function useMarkNotificationRead() {
  return useMutation({
    mutationFn: async (id: string) => {
      const ref = doc(db, "notifications", id);
      await updateDoc(ref, { isRead: true });
    }
  });
}

export function useMarkAllNotificationsRead() {
  return useMutation({
    mutationFn: async (ids: string[]) => {
      const promises = ids.map(id => updateDoc(doc(db, "notifications", id), { isRead: true }));
      await Promise.all(promises);
    }
  });
}
