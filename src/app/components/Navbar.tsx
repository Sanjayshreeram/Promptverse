// /components/Navbar.tsx
"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
//import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Calendar } from "@/components/ui/calendar"
import { ModeToggle } from "@/app/components/ModeToggle"

// Define the navigation items here
const navItems = [
  { title: "Home", href: "/" },
  { title: "Sign In", href: "/api/auth/signin" },
  { title: "Sign Out", href: "/api/auth/signout" },
  { title: "Server", href: "/server" },
  { title: "Client", href: "/client" },
  { title: "Extra", href: "/extra" },

]

export default function Navbar() {

  return (
    <nav className="bg-transparent w-1/2  flex items-center justify-center m-auto p-4">
         <ModeToggle />
      <NavigationMenu>
        <NavigationMenuList className="flex justify-evenly text-2xl font-bold">
          {navItems.map((item) => (
            <NavigationMenuItem key={item.title}>
              <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul>
                  <li>
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      
    </nav>
  )
}
