"use client";

import { LucideKanban, LucideLogOut } from "lucide-react"
import Link from "next/link"
import { homePath, ticketsPath, signInPath, signUpPath } from "@/paths"
import { ThemeSwitcher } from "./theme/theme-switcher"
import { Button } from "./ui/button"
import { SubmitButton } from "./form/submit-button"
import { signOut } from "@/features/auth/actions/sign-out"
import { useAuth } from "@/features/auth/hooks/use-auth";

const Header = () => {
  const { user, isFetched } = useAuth(); 

  if (!isFetched) return null
  
  const navItems = user ? (
      <>
      <Button asChild variant="default" className="rounded-sm" >
        <Link href={ticketsPath()}>Tickets</Link>
      </Button>

      <form action={signOut}>
        {/* <SubmitButton label="Sign out" icon={<LucideLogOut />}/> */}
        <SubmitButton icon={<LucideLogOut />}/>
      </form>
    </>
   ) : (
      <>
        <Button asChild variant="default" className="rounded-sm" >
          <Link href={ticketsPath()}>Tickets</Link>
        </Button>

        <Button asChild variant="outline" className="rounded-sm" >
          <Link href={signUpPath()}>Sign Up</Link>
        </Button>

        <Button asChild variant="outline" className="rounded-sm" >
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