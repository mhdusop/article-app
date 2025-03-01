'use client'

import { Button } from "@/components/ui/button"
import {
   SidebarTrigger,
} from "@/components/ui/sidebar"
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuShortcut,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage } from "@radix-ui/react-avatar"
import { ChevronDown } from "lucide-react"

export function AppHeader() {
   return (
      <header className="flex h-16 shrink-0 items-center gap-2 border-b">
         <div className="flex w-full justify-between items-center gap-2 px-3">
            <SidebarTrigger />
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button className="bg-transparent hover:bg-transparent focus-visible:ring-destructive/0 shadow-none">
                     <div className="flex items-center gap-2">
                        <Avatar>
                           <AvatarImage width={30} className="rounded-full" src="https://github.com/shadcn.png" />
                        </Avatar>
                        <ChevronDown color="#000" size={30} />
                     </div>
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                     <DropdownMenuItem>
                        Profile
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                     </DropdownMenuItem>
                     <DropdownMenuItem>
                        Billing
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                     </DropdownMenuItem>
                     <DropdownMenuItem>
                        Settings
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                     </DropdownMenuItem>
                  </DropdownMenuGroup>
               </DropdownMenuContent>
            </DropdownMenu>
         </div>
      </header>
   )
}