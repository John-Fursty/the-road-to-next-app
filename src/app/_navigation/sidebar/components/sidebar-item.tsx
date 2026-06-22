import Link from "next/link";
import { cloneElement } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { closedClassName } from "../constants";
import { NavItem } from "../types";

type SidebarItemProps = {
    isOpen: boolean;
    isActive: boolean;
    navItem: NavItem;
};

const SidebarItem = ({ isOpen, isActive, navItem }: SidebarItemProps) => {

    return (
        <>
            {navItem.separator && <Separator />}

            <Link
                href={navItem.href}
                className={cn(buttonVariants({ variant: "ghost" }), "group relative flex h-12 justify-start", isActive && "bg-muted font-bold hover:bg-muted")}
            >
                <div className="ml-2">
                    {cloneElement(navItem.icon as React.ReactElement<{className?: string}>, {
                        className: "h-full w-full",
                    })}
                </div>

                <span
                    className={cn(
                        "absolute left-12 text-base duration-200",
                        isOpen ? "md-block block" : "hidden",
                        !isOpen && closedClassName
                    )}
                >
                    {navItem.title}
                </span>
            </Link>
        </> 
    );
}

export { SidebarItem };