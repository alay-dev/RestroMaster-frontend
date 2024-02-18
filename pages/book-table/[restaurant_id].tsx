import { useRouter } from "next/router";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getFloorName } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useFetchFloorsQuery } from "@/api/floor";
import { skipToken } from "@reduxjs/toolkit/query";
import useInitializeCanvas from "@/hooks/useInitializeCanvas";
import BookTableDialog from "./_views/BookTableDialog";
import BookingDetails from "./_views/BookingDetails";
import {
  BookTableContext,
  BookTableProvider,
} from "../../context/tableBooking";
import { TableObject } from "@/types/floor";
import Restaurant from "./_views/Restaurant";

export type BookTableSteps =
  | "restaurant"
  | "seat-selection"
  | "booking-details"
  | "payment";

const BookTable = () => {
  const router = useRouter();
  const restaurant_id = router.query.restaurant_id as string;
  const [currentFloor, setCurrentFloor] = useState<number>(0);
  const [newFloor, setNewFloor] = useState(false);
  const [selectedTable, setSelectedTable] = useState<fabric.Object | null>(
    null
  );
  const [step, setStep] = useState<BookTableSteps>("restaurant");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("");
  const [tableId, setTableId] = useState("");
  const [guestCount, setGuestCount] = useState<null | number>(null);
  const [phoneNo, setPhoneNo] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [note, setNote] = useState("");

  const { data: allFloors, isLoading: allFloorsLoading } = useFetchFloorsQuery(
    restaurant_id ?? skipToken
  );

  const [tableCanvas, tableCanvasWrapper, canvas] = useInitializeCanvas();

  useEffect(() => {
    if (allFloors && !allFloors.length) {
      setCurrentFloor(0);
      setNewFloor(true);
    } else {
      setNewFloor(false);
    }
  }, [allFloors]);

  useEffect(() => {
    if (canvas && allFloors?.length === 0) {
      // canvas.clear();
      // canvas.loadFromJSON(InitialTable, () => {
      //   canvas.renderAll();
      // });
    } else if (
      canvas &&
      allFloors?.length &&
      allFloors.length >= currentFloor
    ) {
      const canvasJSON = JSON.parse(allFloors[currentFloor].canvas);
      canvas.clear();
      canvas.loadFromJSON(canvasJSON, () => {
        canvas._objects?.map((object) => {
          object.lockMovementX = true;
          object.lockMovementY = true;
          object.hasControls = false;
          object.hasRotatingPoint = false;

          console.log(object);
        });

        canvas.renderAll();
      });
      canvas.setBackgroundColor("#F3F4F6", () => canvas.renderAll());
      canvas.on("mouse:down", (e) => {
        const target = e.target as TableObject;
        if (target?.id) {
          setSelectedTable(target);
          setTableId(target?.id);
          canvas.renderAll();
        }
      });
    } else if (allFloors && allFloors?.length < currentFloor + 1) {
      canvas?.clear();
    }
  }, [currentFloor, allFloors, canvas]);

  const handleResetSelection = () => {
    canvas?.discardActiveObject();
    canvas?.renderAll();
    setSelectedTable(null);
  };

  const values: BookTableContext = {
    date,
    setDate,
    time,
    setTime,
    tableId,
    setTableId,
    guestCount,
    setGuestCount,
    note,
    setNote,
    customerName,
    setCustomerName,
    phoneNo,
    setPhoneNo,
  };

  if (step === "restaurant") {
    return <Restaurant setStep={() => setStep("seat-selection")} />;
  }

  if (step === "booking-details")
    return (
      <BookTableProvider value={values}>
        <BookingDetails />
      </BookTableProvider>
    );

  if (step === "payment") {
    return (
      <>
        <h1>Payment</h1>
      </>
    );
  }

  return (
    <BookTableProvider value={values}>
      <div className="bg-gray-100">
        <div className="flex items-center gap-3   pt-4 pl-4 w-max">
          <Tabs
            onValueChange={(val) => setCurrentFloor(Number(val))}
            value={currentFloor?.toString()}
          >
            <TabsList>
              {allFloors?.length === 0 && (
                <TabsTrigger className="font-normal" value="Ground floor">
                  Ground Floor
                </TabsTrigger>
              )}
              {allFloors?.map((floor) => {
                return (
                  <TabsTrigger
                    key={floor?.id}
                    className="font-normal"
                    value={floor.floor_no?.toString()}
                  >
                    {getFloorName(floor.floor_no)}
                  </TabsTrigger>
                );
              })}
              {newFloor && allFloors?.length !== 0 && (
                <TabsTrigger
                  key={allFloors?.length!}
                  className="font-normal"
                  value={allFloors?.length!?.toString()}
                >
                  {getFloorName(allFloors?.length!)}
                </TabsTrigger>
              )}
            </TabsList>
          </Tabs>
        </div>
        <div className="flex justify-center overflow-auto">
          <div
            className="  h-[40rem] w-[80rem] "
            id="canvasWrapper"
            ref={tableCanvasWrapper}
          >
            {/* <Button onClick={() => addTable(800, 100)}>Add Table</Button>
            <Button onClick={() => handleEditTable()}> edit</Button> */}
            <canvas ref={tableCanvas} id="tableCanvas" />
          </div>
        </div>
      </div>
      {Boolean(selectedTable) && (
        <BookTableDialog
          onClose={handleResetSelection}
          onContinue={() => setStep("booking-details")}
          table={selectedTable}
        />
      )}
    </BookTableProvider>
  );
};

export default BookTable;
