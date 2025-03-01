import { AppSidebar } from "@/components/base/sidebar/app-sidebar"
import { AppHeader } from "@/components/base/header/app-header"
import {
   SidebarInset,
   SidebarProvider,

} from "@/components/ui/sidebar"
import {
   Table,
   TableBody,
   TableCell,
   TableFooter,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table"
import { Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Page() {
   return (
      <SidebarProvider>
         <AppSidebar />
         <SidebarInset>
            <AppHeader />
            <main className="flex flex-1 flex-col gap-4 p-4 bg-gray-50">
               <div className="bg-white rounded p-6">
                  <div className="flex justify-between mb-4 ps-5">
                     <div className="flex items-center">
                        <Search size={17} color="#939393" />
                        <Input className="border-0 focus-visible:ring-destructive/0 shadow-none" placeholder="Type here to search" />
                     </div>
                     <div>
                        <Button>
                           <Plus />
                           Add
                        </Button>
                     </div>
                  </div>
                  <Table>
                     <TableHeader className="bg-[#51B15C0A]">
                        <TableRow>
                           <TableHead className="text-primary">Date</TableHead>
                           <TableHead className="text-primary">Title</TableHead>
                           <TableHead className="text-primary">Content</TableHead>
                           <TableHead className="text-right text-primary">Action</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        <TableRow>
                           <TableCell>col 1</TableCell>
                           <TableCell>col 1</TableCell>
                           <TableCell>col 1</TableCell>
                           <TableCell className="text-right">col 1</TableCell>
                        </TableRow>
                     </TableBody>
                     <TableFooter>
                     </TableFooter>
                  </Table>
               </div>
            </main>
         </SidebarInset >
      </SidebarProvider >
   )
}