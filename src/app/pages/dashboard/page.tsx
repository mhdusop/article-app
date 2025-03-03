"use client";

import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/base/sidebar/app-sidebar";
import { AppHeader } from "@/components/base/header/app-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
   Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { ArrowLeft, ArrowLeftCircle, ArrowRightCircle, ChevronLeft, ChevronRight, Pencil, Plus, Search, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AppForm } from "@/components/app-form";
import { useArticleStore } from "@/stores/useArticleStore";
import { useGetArticles } from "@/usecases/use-get-articles";
import { useDeleteArticles } from "@/usecases/use-delete-articles";
import { AppDialog } from "@/components/app-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AppHighlight } from "@/components/app-highlight";
import { useQueryClient } from "react-query";
import { formatDate } from "@/lib/format-date";

export default function Page() {
   const queryClient = useQueryClient();

   // State for search, pagination and filtering
   const [searchTerm, setSearchTerm] = useState("");
   const [debouncedSearch, setDebouncedSearch] = useState("");
   const [currentPage, setCurrentPage] = useState(1);
   const [pageSize, setPageSize] = useState(10);

   // Existing state
   const [showForm, setShowForm] = useState(false);
   const [selectedArticle, setSelectedArticle] = useState<number | null>(null);
   const [isDialogOpen, setDialogOpen] = useState(false);

   // Article state from store
   const { setArticle, resetArticle } = useArticleStore();

   // Fetch articles with search, pagination
   const { data, isLoading, error } = useGetArticles(debouncedSearch, currentPage, pageSize);
   const { mutate: deleteArticle, isLoading: isDeleting } = useDeleteArticles();

   // Debounce search input to prevent too many API calls
   useEffect(() => {
      const timer = setTimeout(() => {
         setDebouncedSearch(searchTerm);
         setCurrentPage(1); // Reset to first page when search changes
      }, 500);

      return () => clearTimeout(timer);
   }, [searchTerm]);

   const handleDeleteConfirm = () => {
      if (selectedArticle) {
         deleteArticle(selectedArticle, {
            onSuccess: () => {
               queryClient.invalidateQueries("articles");
               setDialogOpen(false);
            },
         });
      }
   };

   // Calculate pagination info based on the provided interface
   const totalPages = data?.page_info.last_page || 1;
   const startRecord = ((currentPage - 1) * pageSize) + 1;

   // Go to specific page
   const goToPage = (page: number) => {
      if (page >= 1 && page <= totalPages) {
         setCurrentPage(page);
      }
   };

   if (isLoading) return <p className="text-center text-gray-500">Loading articles...</p>;
   if (error) return <p className="text-center text-red-500">Error loading articles</p>;

   return (
      <>
         <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
               <AppHeader />
               <main className="flex flex-1 flex-col gap-4 p-4 bg-gray-50">
                  <AppHighlight isFormActive={showForm} />
                  <div className="bg-white rounded p-6">
                     <div className="flex justify-between mb-4 ps-5">
                        <div className="flex items-center w-1/3">
                           <Search size={17} color="#939393" />
                           <Input
                              className="border-0 focus-visible:ring-0 shadow-none"
                              placeholder="Type here to search"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                           />
                        </div>
                        <div>
                           <Button
                              onClick={() => {
                                 if (showForm) {
                                    resetArticle();
                                 } else {
                                    setArticle({ title: "", content: "" });
                                 }
                                 setShowForm(!showForm);
                              }}
                           >
                              {showForm ? (
                                 <div className="flex items-center gap-1">
                                    <ArrowLeft />
                                    Back
                                 </div>
                              ) : (
                                 <div className="flex items-center gap-1">
                                    <Plus />
                                    Add
                                 </div>
                              )}
                           </Button>
                        </div>
                     </div>

                     {showForm ? (
                        <AppForm setShowForm={setShowForm} />
                     ) : (
                        <>
                           <Table>
                              <TableHeader className="bg-[#51B15C0A]">
                                 <TableRow>
                                    <TableHead className="text-center text-primary">No</TableHead>
                                    <TableHead className="text-center text-primary">Date</TableHead>
                                    <TableHead className="text-center text-primary">Title</TableHead>
                                    <TableHead className="text-center text-primary">Content</TableHead>
                                    <TableHead className="text-center text-primary">Action</TableHead>
                                 </TableRow>
                              </TableHeader>
                              <TableBody className="text-center">
                                 {data?.articles.length ? (
                                    data.articles.map((article, index) => (
                                       <TableRow key={article.id}>
                                          <TableCell className="text-center">{startRecord + index}</TableCell>
                                          <TableCell>{formatDate(article.created_at)}</TableCell>
                                          <TableCell>{article.title}</TableCell>
                                          <TableCell>{article.content.substring(0, 50)}...</TableCell>
                                          <TableCell className="text-center gap-1 flex justify-center">
                                             <Button
                                                className="bg-yellow-500 hover:bg-yellow-600 rounded-full w-8 h-8"
                                                onClick={() => {
                                                   setArticle(article);
                                                   setShowForm(true);
                                                }}
                                             >
                                                <Pencil />
                                             </Button>
                                             <Button
                                                className="bg-red-500 hover:bg-red-600 rounded-full w-8 h-8"
                                                onClick={() => {
                                                   setSelectedArticle(article.id);
                                                   setDialogOpen(true);
                                                }}
                                                disabled={isDeleting}
                                             >
                                                <Trash />
                                             </Button>
                                          </TableCell>
                                       </TableRow>
                                    ))
                                 ) : (
                                    <TableRow>
                                       <TableCell colSpan={5} className="text-center py-4">
                                          No articles found
                                       </TableCell>
                                    </TableRow>
                                 )}
                              </TableBody>
                              <TableFooter className="bg-white">
                                 <TableRow>
                                    <TableCell colSpan={5}>
                                       <div className="flex justify-between items-center">
                                          <div className="flex justify-end">
                                             <div className="flex items-center gap-2">
                                                <span className="text-sm text-gray-500">Show</span>
                                                <Select
                                                   value={pageSize.toString()}
                                                   onValueChange={(value) => {
                                                      setPageSize(Number(value));
                                                      setCurrentPage(1); // Reset to first page when page size changes
                                                   }}
                                                >
                                                   <SelectTrigger className="w-20">
                                                      <SelectValue placeholder="10" />
                                                   </SelectTrigger>
                                                   <SelectContent>
                                                      <SelectItem value="5">5</SelectItem>
                                                      <SelectItem value="10">10</SelectItem>
                                                      <SelectItem value="20">20</SelectItem>
                                                      <SelectItem value="50">50</SelectItem>
                                                   </SelectContent>
                                                </Select>
                                                <span className="text-sm text-gray-500">entries</span>
                                             </div>
                                          </div>
                                          <div className="flex gap-1">
                                             <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => goToPage(1)}
                                                disabled={currentPage === 1}
                                             >
                                                <ArrowLeftCircle size={16} />
                                             </Button>
                                             <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => goToPage(currentPage - 1)}
                                                disabled={currentPage === 1}
                                             >
                                                <ChevronLeft size={16} />
                                             </Button>

                                             {/* Page numbers */}
                                             {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                                let pageNum;
                                                if (totalPages <= 5) {
                                                   // If 5 or fewer pages, show all
                                                   pageNum = i + 1;
                                                } else if (currentPage <= 3) {
                                                   // If on early pages
                                                   pageNum = i + 1;
                                                } else if (currentPage >= totalPages - 2) {
                                                   // If on late pages
                                                   pageNum = totalPages - 4 + i;
                                                } else {
                                                   // If in middle, center current
                                                   pageNum = currentPage - 2 + i;
                                                }

                                                return (
                                                   <Button
                                                      key={pageNum}
                                                      variant={currentPage === pageNum ? "default" : "outline"}
                                                      size="sm"
                                                      onClick={() => goToPage(pageNum)}
                                                   >
                                                      {pageNum}
                                                   </Button>
                                                );
                                             })}

                                             <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => goToPage(currentPage + 1)}
                                                disabled={currentPage === totalPages}
                                             >
                                                <ChevronRight size={16} />
                                             </Button>
                                             <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => goToPage(totalPages)}
                                                disabled={currentPage === totalPages}
                                             >
                                                <ArrowRightCircle size={16} />
                                             </Button>
                                          </div>
                                       </div>
                                    </TableCell>
                                 </TableRow>
                              </TableFooter>
                           </Table>
                        </>
                     )}
                  </div>
               </main>
            </SidebarInset>
         </SidebarProvider>

         <AppDialog
            isOpen={isDialogOpen}
            onClose={() => setDialogOpen(false)}
            onConfirm={handleDeleteConfirm}
            isLoading={isDeleting}
         />
      </>
   );
}