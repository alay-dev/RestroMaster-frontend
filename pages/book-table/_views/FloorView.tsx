import { BookTableContext, BookTableProvider } from "@/context/tableBooking";
import BookTableDialog from "./BookTableDialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useInitializeCanvas from "@/hooks/useInitializeCanvas";
import { getFloorName } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useFetchFloorsQuery } from "@/api/floor";
import { useRouter } from "next/router";
import { skipToken } from "@reduxjs/toolkit/query";
import { BookTableSteps } from "../[restaurant_id]";
import { TableObject } from "@/types/floor";
import { Canvas } from "fabric/fabric-impl";

const FloorView = ({
  setStep,
  setTableId,
}: {
  setStep: (val: BookTableSteps) => void;
  setTableId: (val: string) => void;
}) => {
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const [currentFloor, setCurrentFloor] = useState<number>(0);
  const [newFloor, setNewFloor] = useState(false);
  const [selectedTable, setSelectedTable] = useState<fabric.Object | null>(
    null
  );

  const router = useRouter();
  const restaurant_id = router.query.restaurant_id as string;

  const { data: allFloors } = useFetchFloorsQuery(restaurant_id ?? skipToken);

  const [tableCanvas, tableCanvasWrapper] = useInitializeCanvas(
    canvas,
    setCanvas
  );

  console.log("FLOOR RENDERED");

  useEffect(() => {
    if (canvas && allFloors?.length === 0) {
      // canvas.clear();
      // canvas.loadFromJSON(InitialTable, () => {
      //   canvas.renderAll();
      // });

      console.log("NO FLoors");
    }

    if (canvas && allFloors?.length) {
      const canvasJSON = JSON.parse(allFloors[currentFloor].canvas);
      canvas.loadFromJSON(canvasJSON, () => {
        canvas._objects?.map((object) => {
          object.lockMovementX = true;
          object.lockMovementY = true;
          object.hasControls = false;
          object.hasRotatingPoint = false;
        });

        canvas.setBackgroundColor("#F3F4F6", () => canvas.renderAll());
        canvas.on("mouse:down", (e) => {
          console.log(e, "MOSUE DOWN");
          const target = e.target as TableObject;
          if (target?.id) {
            setSelectedTable(target);
            setTableId(target?.id);
          }
        });

        canvas.renderAll();
      });
    }
  }, [currentFloor, allFloors]);

  const handleResetSelection = () => {
    canvas?.discardActiveObject();
    canvas?.renderAll();
    setSelectedTable(null);
  };

  return (
    <>
      <div className="bg-gray-100 h-screen flex items-center flex-col justify-center relative">
        <div className="absolute top-4 left-2 flex items-center gap-3   pt-4 pl-4 w-max">
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
        <div
          onClick={() => console.log("hello")}
          className="flex  pt-5 w-full overflow-auto relative "
          ref={tableCanvasWrapper}
        >
          {/* <div
            className="w-full overflow-auto z-0"
            id="canvasWrapper"
            ref={tableCanvasWrapper}
          > */}
          {/* <Button onClick={() => addTable(800, 100)}>Add Table</Button>
        <Button onClick={() => handleEditTable()}> edit</Button> */}

          <canvas ref={tableCanvas} className="absolute z-20 " />
        </div>
        {/* </div> */}
      </div>

      <BookTableDialog
        onClose={handleResetSelection}
        onContinue={() => setStep("booking-details")}
        table={selectedTable}
      />
    </>
  );
};

export default FloorView;
