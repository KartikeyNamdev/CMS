import {
  ChartPieIcon,
  ServerIcon,
  BuildingOfficeIcon,
  CheckCircleIcon,
  Battery100Icon,
  ChartBarIcon,
  MapPinIcon,
  BoltIcon,
  ClockIcon,
  MapIcon,
  FaceFrownIcon,
} from "@heroicons/react/24/solid";
import { CrownIcon, UserIcon } from "lucide-react";

// Dashboard Links
export const DashBoardlinks = [
  { name: "Overview", href: "/dashboard", icon: ChartPieIcon },
  { name: "All Chargers", href: "/dashboard/all", icon: ServerIcon },
];

export const CompanyManageMentLinks = [
  {
    name: "Overview",
    href: "/company",
    icon: BuildingOfficeIcon,
  },
  {
    name: "clients",
    href: "/company/clients",
    icon: CheckCircleIcon,
  },
];
export const ChargerManageMentLinks = [
  {
    name: "Overview",
    href: "/charger",
    icon: ChartBarIcon,
  },
  {
    name: "Stations",
    href: "/charger/station",
    icon: MapPinIcon,
  },
  {
    name: "Chargers",
    href: "/charger/chargers",
    icon: BoltIcon,
  },
  {
    name: "Charging Logs",
    href: "/charger/charging-log",
    icon: ClockIcon,
  },
  {
    name: "Station Map",
    href: "/charger/station-map",
    icon: MapIcon,
  },
];
export const userManagementLinks = [
  {
    name: "Overview",
    href: "/user",
    icon: UserIcon,
  },
  {
    name: "Adminstrator",
    href: "/user/admin",
    icon: CrownIcon,
  },
];
