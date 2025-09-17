import { create } from "zustand";
import { persist } from "zustand/middleware";

type CareGiverState = {
  careGiver: any;
  setCareGiver: (data: any) => void;
};

export const useCareGiverStore = create<CareGiverState>()(
  persist(
    (set) => ({
      careGiver: null,
      setCareGiver: (data: any) => {
        set({ careGiver: { ...data } });
      },
    }),
    {
      name: "caregiver-storage",
    }
  )
);
