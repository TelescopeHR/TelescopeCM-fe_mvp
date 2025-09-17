import { create } from "zustand";
import { persist } from "zustand/middleware";

type ClientState = {
  client: any;
  setClient: (data: any) => void;
};

export const useClientStore = create<ClientState>()(
  persist(
    (set) => ({
      client: null,
      setClient: (data: any) => {
        set({ client: { ...data } });
      },
    }),
    {
      name: "client-storage",
    }
  )
);
