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
  },
  {
    path: "/floor-view",
    icon: BarChair,
  },
  {
    path: "/dishes",
    icon: DonutBitten,
  },

  {
    path: "/orders",
    icon: OrderIcon,
  },
  {
    path: "/employees",
    icon: EmployeeIcon,
  },
  {
    path: "/profile",
    icon: Settings,
  },
];
