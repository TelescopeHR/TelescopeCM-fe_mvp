import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserState = {
  user: any;
  setUser: (data: any) => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (data: any) => {
        set({ user: { ...data } });
      },
    }),
    {
      name: "user-storage",
    }
  )
);
