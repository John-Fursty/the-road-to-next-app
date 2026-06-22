"use client";

import { LucideKanban } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/features/auth/hooks/use-auth";
import { homePath, signInPath, signUpPath,ticketsPath } from "@/paths"
import { ThemeSwitcher } from "../../components/theme/theme-switcher"
import { Button } from "../../components/ui/button"
import { AccountDropdown } from "./account-dropdown";

const Header = () => {
  const { user, isFetched } = useAuth(); 

  if (!isFetched) return null
  
  const navItems = user ? (
      <>
        <AccountDropdown user={user}/>
    </>
   ) : (
      <>
        <Button asChild variant="outline" className="rounded-sm" >
          <Link href={signUpPath()}>Sign Up</Link>
        </Button>

        <Button asChild variant="default" className="rounded-sm" >
          <Link href={signInPath()}>Sign In</Link>
        </Button>
      </>
    )
  
    return (
        <nav className="header-from-top supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur w-full flex py-2.5 px-5 justify-between">
          <div className="flex align-items gap-x-2">
            <Button asChild variant="ghost" >
              <Link href={homePath()}>
                <LucideKanban />
                <h1 className="ml-2 text-lg font-semibold">TicketBounty</h1>
              </Link>
            </Button> 
          </div> 
          <div className="flex align-items gap-x-2">
            <ThemeSwitcher/>
              {navItems}
          </div> 
        </nav>
    )
}

export { Header }