import {
  LucideBook,
  LucideBookCopy,
  LucideCircleUser,
  LucideLibrary,
  LucideUsers,
} from "lucide-react";
import {
  accountProfilePath,
  homePath,
  organizationsPath,
  ticketsByOrganizationPath,
  ticketsPath,
} from "@/paths";
import { NavItem } from "./types";

export const navItems: NavItem[] = [
  {
    title: "All tickets",
    icon: <LucideLibrary />,
    href: homePath(),
  },
  {
    title: "Our tickets",
    icon: <LucideBookCopy />,
    href: ticketsByOrganizationPath(),
  },
  {
    title: "My tickets",
    icon: <LucideBook />,
    href: ticketsPath(),
  },
  {
    separator: true,
    title: "Account",
    icon: <LucideCircleUser />,
    href: accountProfilePath(),
  },
  {
    title: "Organizations",
    icon: <LucideUsers />,
    href: organizationsPath(),
  },
];

export const closedClassName =
  "text-background opacity-0 transition-all duration-300 group-hover:z-40 group-hover:ml-4 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100";
