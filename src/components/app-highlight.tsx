import { Wallet } from "lucide-react";

export function AppHighlight({ isFormActive }: { isFormActive: boolean }) {
   return (
      <div className="flex items-center border-b-2 border-gray-300 gap-3">
         <div className={`flex w-xs py-3 items-center gap-2 border-b-2 ${!isFormActive ? "border-primary" : "border-transparent"}`}>
            <div className={`rounded-full border w-10 h-10 min-w-10 min-h-10 flex items-center justify-center ${!isFormActive ? "border-primary text-primary" : "border-gray-300 text-gray-500"}`}>
               <Wallet size={17} />
            </div>
            <div className="w-full">
               <h3 className={`${!isFormActive ? "text-primary" : "text-gray-500"} font-bold`}>Article</h3>
               <p className={`${!isFormActive ? "text-primary" : "text-gray-500"} font-light text-sm`}>List Article</p>
            </div>
         </div>
         <div className={`flex w-xs py-3 items-center gap-2 border-b-2 ${isFormActive ? "border-green-500" : "border-transparent"}`}>
            <div className={`rounded-full border w-10 h-10 min-w-10 min-h-10 flex items-center justify-center ${isFormActive ? "border-green-500 text-green-500" : "border-gray-300 text-gray-500"}`}>
               <Wallet size={17} />
            </div>
            <div className="w-full">
               <h3 className={`${isFormActive ? "text-green-500" : "text-gray-500"} font-bold`}>Add/Edit</h3>
               <p className={`${isFormActive ? "text-green-500" : "text-gray-500"} font-light text-sm`}>Detail Article</p>
            </div>
         </div>
      </div>
   );
}