import {
  Grid2X2,
  Bolt,
  Blend,
  CreditCard,
  Blocks,
  Flower,
  Activity,
  UserRound,
  LogOut,
  School2,
} from "lucide-react";

export const SidebarMenuData = [
  {
    title: "Dashboard",
    Icon: Grid2X2,
    path: "/dashboard",
  },

  {
    title: "Academics",
    Icon: School2,
    path: "/dashboard/academics",
    items: [
      {
        title: "Attendance",
        path: "/dashboard/academics/attendance",
      },
      {
        title: "Classes",
        path: "/dashboard/academics/classes",
      },
      {
        title: "Class works",
        path: "/dashboard/academics/class-works",
      },
      {
        title: "Exams",
        path: "/dashboard/academics/exams",
      },
      {
        title: "Lessons",
        path: "/dashboard/academics/lessons",
      },
      {
        title: "Results",
        path: "/dashboard/academics/results",
      },
      {
        title: "Subjects",
        path: "/dashboard/academics/subjects",
      },
    ],
  },

  {
    title: "Finance",
    Icon: CreditCard,
    path: "/dashboard/finance",
    // items: [
    //   {
    //     title: "Teachers",
    //     path: "/dashboard/staff/teachers",
    //   },
    // ],
  },
  {
    title: "Parents",
    Icon: Flower,
    path: "/dashboard/parents",
  },

  {
    title: "Students",
    Icon: Blocks,
    path: "/dashboard/students",
    items: [
      {
        title: "Teachers",
        path: "/dashboard/staff/teachers",
      },
    ],
  },

  {
    title: "Staff",
    Icon: Blend,
    path: "/dashboard/staff",
    items: [
      {
        title: "Teachers",
        path: "/dashboard/staff/teachers",
      },
    ],
  },

  {
    title: "Settings",
    Icon: Bolt,
    path: "/dashboard/settings",
    items: [
      {
        title: "Onboard",
        path: "/dashboard/settings/onboard",
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
  },

  {
    title: "Logout",
    Icon: LogOut,
    path: "",
  },
];
