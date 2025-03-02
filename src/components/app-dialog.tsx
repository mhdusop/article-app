"use client";

import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface DeleteConfirmationDialogProps {
   isOpen: boolean;
   onClose: () => void;
   onConfirm: () => void;
   isLoading?: boolean;
}

export function AppDialog({ isOpen, onClose, onConfirm, isLoading }: DeleteConfirmationDialogProps) {
   return (
      <Dialog open={isOpen} onOpenChange={onClose}>
         <DialogContent>
            <DialogHeader>
               <DialogTitle className="flex items-center gap-3">
                  <div className="bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center">
                     <Trash2 color="red" />
                  </div>
                  Delete Article?
               </DialogTitle>
               <DialogDescription>
                  Are you sure you want to delete it? You can’t undo this action.
               </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end gap-2">
               <Button className="bg-gray-200 hover:bg-gray-300 text-black" onClick={onClose}>
                  Cancel
               </Button>
               <Button className="bg-red-500 hover:bg-red-600" onClick={onConfirm} disabled={isLoading}>
                  {isLoading ? "Deleting..." : "Delete"}
               </Button>
            </div>
         </DialogContent>
      </Dialog>
   );
}