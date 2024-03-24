import {
  ChefHat,
  Home,
  BarChair,
  Settings,
  Logout,
  DonutBitten as Dishes,
  DonutBitten,
  OvenMittsMinimalistic as OrderIcon,
  UserId as EmployeeIcon,
} from "solar-icon-set";

export const navigation = [
  {
    path: "/dashboard",
    icon: Home,
    name: "Dashboard",
  },
  {
    path: "/floor-view",
    icon: BarChair,
    name: "Floor view",
  },
  {
    path: "/dishes",
    icon: DonutBitten,
    name: "Dishes",
  },

  {
    path: "/orders",
    icon: OrderIcon,
    name: "Orders",
  },
  {
    path: "/employees",
    icon: EmployeeIcon,
    name: "Employees",
  },
  {
    path: "/profile",
    icon: Settings,
    name: "Profile",
  },
];
