import { Button } from "@/components/ui/button";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useContext } from "react";
import { Eye } from "solar-icon-set";
import { BookTable } from "../../../context/tableBooking";

const BookTableDialog = ({
  table,
  onClose,
  onContinue,
}: BookTableDialogProps) => {
  const bookTable = useContext(BookTable);

  return (
    <Sheet modal={false} open={true}>
      <SheetContent
        isClosable={false}
        side="bottom"
        className="flex items-center justify-between"
      >
        {table ? (
          <>
            <div>
              <div className="flex items-end">
                <h3 className="text-2xl mb-2">{bookTable?.tableId}</h3>
              </div>

              <div className="rounded-3xl bg-orange-400 text-white px-5 py-px w-max flex items-center gap-2 ">
                <Eye />
                <p>4</p>
              </div>
            </div>
            <Button onClick={onContinue}>Continue</Button>
          </>
        ) : (
          <div>
            <h3 className="font-medium text-lg">
              Select a seat of your comfort
            </h3>
            <p className="text-gray-500">& avoid in restaurant hastle.</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default BookTableDialog;

type BookTableDialogProps = {
  table: fabric.Object | null;
  onClose: () => void;
  onContinue: () => void;
};
