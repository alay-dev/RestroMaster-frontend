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
    icon: <Home iconStyle="BoldDuotone" size={25} />,
  },
  {
    path: "/table-view",
    icon: <BarChair iconStyle="BoldDuotone" size={25} />,
  },
  {
    path: "/dishes",
    icon: <DonutBitten iconStyle="BoldDuotone" size={25} />,
  },

  {
    path: "/orders",
    icon: <OrderIcon iconStyle="BoldDuotone" size={25} />,
  },
  {
    path: "/employees",
    icon: <EmployeeIcon iconStyle="BoldDuotone" size={25} />,
  },
  {
    path: "/profile",
    icon: <Settings iconStyle="BoldDuotone" size={25} />,
  },
];
