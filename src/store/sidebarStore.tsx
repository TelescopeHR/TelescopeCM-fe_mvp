import { create } from "zustand";
import { persist } from "zustand/middleware";

type SidebarState = {
  sidebar: boolean;
  toggleSidebar: () => void;
};

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set, get) => ({
      sidebar: true,
      toggleSidebar: () => {
        const newSidebar = get().sidebar;
        set({ sidebar: !newSidebar });
      },
    }),
    {
      name: "sidebar-storage",
    }
  )
);
