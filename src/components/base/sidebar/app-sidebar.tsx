import * as React from "react"
import { Newspaper } from "lucide-react"
import LogoArticle from '@/../public/img/logo-article.png'

import {
   Sidebar,
   SidebarContent,
   SidebarGroup,
   SidebarHeader,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
   SidebarRail,
} from "@/components/ui/sidebar"
import Image from "next/image"

// This is sample data.
const data = {
   navMain: [
      {
         title: "Article",
         url: "#",
         icon: Newspaper
      },
   ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
   return (
      <Sidebar {...props}>
         <SidebarHeader>
            <SidebarMenu>
               <SidebarMenuItem>
                  <SidebarMenuButton size="lg" className="justify-center" asChild>
                     <a href="#">
                        <Image src={LogoArticle} alt="logo" />
                        <div className="flex items-center">
                           <span className="font-semibold text-primary text-lg">Logo</span>
                        </div>
                     </a>
                  </SidebarMenuButton>
               </SidebarMenuItem>
            </SidebarMenu>
         </SidebarHeader>
         <SidebarContent>
            <SidebarGroup>
               <SidebarMenu>
                  {data.navMain.map((item) => (
                     <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton className="hover:text-primary hover:bg-[#51B15C0A] p-5 border-s-3 border-primary rounded-none" asChild>
                           <a href={item.url} className="font-medium text-primary">
                              <item.icon />
                              {item.title}
                           </a>
                        </SidebarMenuButton>
                     </SidebarMenuItem>
                  ))}
               </SidebarMenu>
            </SidebarGroup>
         </SidebarContent>
         <SidebarRail />
      </Sidebar>
   )
}