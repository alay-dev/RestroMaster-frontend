import { Slider } from "@/components/ui/slider";
import { Button } from "@/components//ui/button";
import { useState, useEffect, useRef } from "react";
import { fabric } from "fabric";
import { Canvas } from "fabric/fabric-impl";

const AddTableDrawer = ({ addTable, setAddDrawer }: AddTableDrawerProps) => {
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const [topSeat, setTopSeat] = useState([3]);
  const [bottomSeat, setBottomSeat] = useState([3]);
  const [leftSeat, setLeftSeat] = useState([1]);
  const [rightSeat, setRightSeat] = useState([1]);

  const initCanvas = () => {
    const el = document
      .getElementById("tableConfigCanvasWrapper")
      ?.getBoundingClientRect();

    return new fabric.Canvas("tableConfigCanvas", {
      height: el?.height,
      width: el?.width,
      backgroundColor: "#eee",
    });
  };

  const createTable = (
    tableWidth: number,
    tableHeight: number,
    seatTop: number,
    seatRight: number,
    seatBottom: number,
    seatLeft: number
  ) => {
    const spaceBetweenSeat = 5;
    const seatEdgeSpace = 10;
    const seatHeight = 20;

    const table = new fabric.Rect({
      left: 0,
      top: 0,
      width: tableWidth,
      height: tableHeight,
      rx: 20,
      fill: "#fff",
    });

    //TOP SEATS GENERATION
    const topSeats: fabric.Rect[] = [];
    for (let i = 0; i < seatTop; i++) {
      const seatWidth =
        (tableWidth - 2 * seatEdgeSpace - (seatTop - 1) * spaceBetweenSeat) /
        seatTop;
      const seat = new fabric.Rect({
        fill: "#fff",
        width: seatWidth,
        height: seatHeight,
        rx: 6,
        left: seatEdgeSpace + i * seatWidth + i * spaceBetweenSeat,
      });
      topSeats.push(seat);
    }
    const topSeatGrp = new fabric.Group(topSeats, {
      top: -seatHeight - 5,
    });

    //  BOTTOM SEATS GENERATION
    const bottomSeats: fabric.Rect[] = [];
    for (let i = 0; i < seatBottom; i++) {
      const seatWidth =
        (tableWidth - 2 * seatEdgeSpace - (seatBottom - 1) * spaceBetweenSeat) /
        seatBottom;
      const seat = new fabric.Rect({
        fill: "#fff",
        width: seatWidth,
        height: seatHeight,
        rx: 6,
        left: seatEdgeSpace + i * seatWidth + i * spaceBetweenSeat,
      });
      bottomSeats.push(seat);
    }
    const bottomSeatGrp = new fabric.Group(bottomSeats, {
      top: tableHeight + 5,
    });

    //  LEFT SEATS GENERATION
    const leftSeats: fabric.Rect[] = [];
    for (let i = 0; i < seatLeft; i++) {
      const seatWidth =
        (tableHeight - 2 * seatEdgeSpace - (seatLeft - 1) * spaceBetweenSeat) /
        seatLeft;
      const seat = new fabric.Rect({
        fill: "#fff",
        width: seatHeight,
        height: seatWidth,
        rx: 6,
        top: seatEdgeSpace + i * seatWidth + i * spaceBetweenSeat,
      });
      leftSeats.push(seat);
    }
    const leftSeatGrp = new fabric.Group(leftSeats, {
      left: -seatHeight - 5,
    });

    //  RIGHT SEATS GENERATION
    const rightSeats: fabric.Rect[] = [];
    for (let i = 0; i < seatRight; i++) {
      const seatWidth =
        (tableHeight - 2 * seatEdgeSpace - (seatRight - 1) * spaceBetweenSeat) /
        seatRight;
      const seat = new fabric.Rect({
        fill: "#fff",
        width: seatHeight,
        height: seatWidth,
        rx: 6,
        top: seatEdgeSpace + i * seatWidth + i * spaceBetweenSeat,
      });
      rightSeats.push(seat);
    }
    const rightSeatGrp = new fabric.Group(rightSeats, {
      left: tableWidth + 5,
    });

    const tableWithSeats = new fabric.Group(
      [topSeatGrp, table, bottomSeatGrp, leftSeatGrp, rightSeatGrp],
      {
        lockScalingX: true,
        lockScalingY: true,
        // cornerStyle: 'circle',
        // cornerSize: 1,
      }
    );

    const x = canvas?.getWidth()! / 2 - tableWithSeats.getScaledWidth() / 2;
    const y = canvas?.getHeight()! / 2 - tableWithSeats.getScaledHeight() / 2;

    tableWithSeats.set({ left: x, top: y });

    return tableWithSeats;
  };

  useEffect(() => {
    if (!canvas) {
      const canvasEl = initCanvas();
      setCanvas(canvasEl);
      return;
    }

    if (canvas) {
      const table = createTable(
        150,
        60,
        topSeat.at(0)!,
        rightSeat.at(0)!,
        bottomSeat.at(0)!,
        leftSeat.at(0)!
      );
      canvas.add(table);
      canvas.renderAll();
    }

    return () => {
      canvas.renderAll();
      setCanvas(null);
    };
  }, [canvas, topSeat, leftSeat, rightSeat, bottomSeat]);

  const handleAddTable = () => {
    addTable(
      100,
      300,
      300,
      100,
      topSeat[0],
      rightSeat[0],
      bottomSeat[0],
      leftSeat[0]
    );
    setAddDrawer(false);
  };

  return (
    <div className="h-full">
      <div id="tableConfigCanvasWrapper" className="h-40 mb-4">
        <canvas id="tableConfigCanvas" />
      </div>
      <div className="pb-3 mb-3 overflow-auto h-max">
        <label>Select a table type</label>
        <div className="flex items-center gap-3 mt-1 mb-3 overflow-auto no-scroll-bar">
          <div className="flex-shrink-0 h-32 border shadow-sm w-52 rounded-xl flex items-center p-1 bg-gray-100">
            <img
              src="/images/tableView/table1.png"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        <label>Set table seats</label>
        <div className="mt-2 mb-4 text-black">
          <ul>
            <li className="flex items-center mb-3">
              <p className="w-28">Top</p>
              <div className="w-full">
                <Slider
                  onValueChange={(val) => setTopSeat(val)}
                  color="primary"
                  value={topSeat}
                  max={10}
                  step={1}
                />
              </div>
            </li>
            <li className="flex items-center mb-3">
              <p className="w-28">Right</p>
              <div className="w-full">
                <Slider
                  onValueChange={(val) => setRightSeat(val)}
                  value={rightSeat}
                  color="primary"
                  defaultValue={[1]}
                  max={5}
                  step={1}
                />
              </div>
            </li>
            <li className="flex items-center mb-3">
              <p className="w-28">Bottom</p>
              <div className="w-full">
                <Slider
                  onValueChange={(val) => setBottomSeat(val)}
                  value={bottomSeat}
                  color="primary"
                  defaultValue={[3]}
                  max={10}
                  step={1}
                />
              </div>
            </li>
            <li className="flex items-center mb-3">
              <p className="w-28">Left</p>
              <div className="w-full">
                <Slider
                  onValueChange={(val) => setLeftSeat(val)}
                  value={leftSeat}
                  color="primary"
                  defaultValue={[1]}
                  max={5}
                  step={1}
                />
              </div>
            </li>
          </ul>
        </div>

        <Button onClick={() => handleAddTable()} className="float-right">
          Create table
        </Button>
      </div>
    </div>
  );
};

export default AddTableDrawer;

type AddTableDrawerProps = {
  addTable: (
    tableLeft: number,
    tableTop: number,
    tableWidth: number,
    tableHeight: number,
    seatTop: number,
    seatRight: number,
    seatBottom: number,
    seatLeft: number
  ) => void;
  setAddDrawer: (data: boolean) => void;
};
