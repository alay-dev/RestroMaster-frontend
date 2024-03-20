import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const DeleteFloorConfirm = ({
  isOpen,
  floor,
  onClose,
  onConfirm,
}: DeleteFloorConfirmProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="gap-0">
        <h2 className="font-medium text-lg mb-2">
          Are you sure you want to delete the{" "}
          <span className="font-semibold underline text-green-600">
            {floor}
          </span>
          ?
        </h2>
        <p className="text-gray-500 ">
          You cannot revert this porcess. All the floor setup data will be lost.
        </p>
        <div className="mt-7 flex items-center gap-4 justify-end">
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-gradient-to-r from-red-500 to-red-700"
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteFloorConfirm;

type DeleteFloorConfirmProps = {
  floor: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};
