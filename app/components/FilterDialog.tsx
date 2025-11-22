import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import SlideBtn from "./SlideBtn";

// Define a type for the data structure being passed
type dataType = {
  label?: string;
  value?: string; // Added value for dynamic input
};

function FilterDialog({
  data,
  title,
  onClose,
}: {
  data: dataType[];
  title: string;
  onClose: () => void;
}) {
  return (
    <Dialog>
      <form className="h-full">
        <DialogTrigger asChild className="h-12 w-12">
          {/* Trigger Button (using h-10 w-10 for consistency) */}
          <Button variant="outline" className="h-12 w-12 p-0">
            <AdjustmentsHorizontalIcon className="h-5 w-5" />
          </Button>
        </DialogTrigger>

        {/* --- SCROLLING FIXES APPLIED HERE --- */}
        <DialogContent
          className="
            sm:max-w-[425px] rounded-lg shadow-xl text-white border border-gray-600 border-opacity-30 
            flex flex-col max-h-[60vh] 
            /* Custom dark background styles */
            bg-white/15 backdrop-filter backdrop-blur-md 
          "
        >
          <DialogHeader className="flex">
            <DialogTitle className="text-white text-xl">{title}</DialogTitle>
            <DialogDescription className="flex border-b border-gray-700 pb-2"></DialogDescription>
          </DialogHeader>

          {/* --- SCROLLABLE CONTENT AREA --- */}
          <div className="grid gap-4 grow overflow-y-auto pr-2">
            {data?.map((field, idx) => {
              // Ensure fields have unique IDs for accessibility
              const uniqueId = `${"field"}-${idx}`;
              return (
                <div className="flex justify-between pt-2 gap-3" key={uniqueId}>
                  <Label htmlFor={uniqueId} className="text-gray-200">
                    {field.label}
                  </Label>
                  <SlideBtn />
                </div>
              );
            })}
          </div>

          <DialogFooter className="mt-4 pt-4 border-t border-gray-700/50">
            <DialogClose asChild>
              <Button
                onClick={onClose}
                type="submit"
                className="bg-[#b22828] hover:bg-red-800 w-full rounded-full text-white"
              >
                Apply
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
export default FilterDialog;
