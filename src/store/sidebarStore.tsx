import { create } from "zustand";
import { persist } from "zustand/middleware";

type SidebarState = {
  sidebar: boolean;
  toggleSidebar: () => void;
  currentModule: {
    name: string;
    desc: string;
    tab: string;
  };
  setModule: (data: any) => void;
};

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set, get) => ({
      sidebar: true,
      currentModule: {
        name: "Overview",
        desc: "Subtitle text for module title",
        tab: "dashboard",
      },
      toggleSidebar: () => {
        const newSidebar = get().sidebar;
        set({ sidebar: !newSidebar });
      },
      setModule: (data: any) => {
        set({ currentModule: { ...data } });
      },
    }),
    {
      name: "sidebar-storage",
    }
  )
);
