"use client"

import { useState } from "react";
import { navItems } from "../constants";
import { cn } from "@/lib/utils";
import { SidebarItem } from "./sidebar-item";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { usePathname } from "next/navigation";
import { getActivePath } from "@/utils/get-active-path";
import { sign } from "crypto";
import { signInPath, signUpPath } from "@/paths";

const SideBar = () => {
    const { user, isFetched } = useAuth(); 
    const pathName = usePathname();

    const { activeIndex } = getActivePath(
        pathName,
        navItems.map((item) => item.href),
        [signInPath(), signUpPath()]
    )

    const [isTransition, setTransition] = useState(false);
    const [isOpen, setOpen] = useState(false);

    const handleToggle = (open: boolean) => {
        setTransition(true);
        setOpen(open);
        setTimeout(() => setTransition(false), 200)
    };

    if (!user || !isFetched) return <div className="w-19.5  "></div>

    return (
        <nav 
            className={cn("sidebar-from-left h-screen border-r pt-24",
                isTransition && "duration-200",
                isOpen ? "md:w-60 w-19.5" : "w-19.5")}
                onMouseEnter={() => handleToggle(true)}
                onMouseLeave={() => handleToggle(false)}
        >
            <div className="px-3 py-2">
                <nav className="space-y-2">
                    {navItems.map((navItem, index) => (
                        <SidebarItem
                            key={navItem.title}
                            isOpen={isOpen}
                            isActive={activeIndex === index}
                            navItem={navItem}
                        />
                    ))}
                </nav>
            </div>
        </nav>
    )
};


export { SideBar }; 