import {
  Grid2X2,
  Bolt,
  Blend,
  // CreditCard,
  Flower,
  Activity,
  UserRound,
  LogOut,
} from "lucide-react";

export const SidebarMenuData = [
  {
    title: "Dashboard",
    Icon: Grid2X2,
    path: "/dashboard",
  },

  // {
  //   title: "Finance",
  //   Icon: CreditCard,
  //   path: "/dashboard/finance",
  // },

  {
    title: "Clients",
    Icon: Flower,
    path: "/dashboard/clients",
  },

  {
    title: "Employees",
    Icon: Blend,
    path: "/dashboard/employees",
    // items: [
    //   {
    //     title: "Onboard",
    //     path: "/dashboard/settings/onboard",
    //   },
    // ],
  },

  {
    title: "Settings",
    Icon: Bolt,
    path: "/dashboard/settings/onboard/employee",
    // path: "/dashboard/settings",
    items: [
      {
        title: "Onboard Employee",
        path: "/dashboard/settings/onboard/employee",
      },

      {
        title: "Onboard Client",
        path: "/dashboard/settings/onboard/client",
      },
    ],
  },

  {
    title: "System Activites",
    Icon: Activity,
    path: "/dashboard/audit-trail",
  },
];

export const SidebarSecMenuData = [
  {
    title: "Profile",
    Icon: UserRound,
    path: "",
    items: [],
    action: false,
  },

  {
    title: "Logout",
    Icon: LogOut,
    path: "",
    action: true,
  },
];
