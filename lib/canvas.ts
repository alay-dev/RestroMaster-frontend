import { TableGroup } from "@/types/floor";
import { fabric } from "fabric";

const spaceBetweenSeat = 5;
const seatEdgeSpace = 10;
const seatHeight = 30;

const createCircularTable = ({
  seatCount,
  radius,
}: CreateCircularTableProps) => {
  const table = new fabric.Circle({
    radius: radius,
    left: -radius,
    top: -radius,
    fill: "#fff",
  });

  const angleIncrement = (2 * Math.PI) / seatCount;

  // Calculate the coordinates of each point
  const points = [];
  for (let i = 0; i < seatCount; i++) {
    const angle = i * angleIncrement;
    const x = 0 + radius * Math.cos(angle);
    const y = 0 + radius * Math.sin(angle);
    points.push({ x, y });
  }

  const seats = points.map((point) => {
    return new fabric.Circle({
      radius: 5,
      left: point.x,
      top: point.y,
      fill: "#000",
    });
  });

  const seatGrp = new fabric.Group(seats);

  const tableWithSeats: TableGroup = new fabric.Group([table, seatGrp], {
    top: 0,
    left: 0,
    cornerStyle: "circle",
    cornerSize: 10,
    lockUniScaling: false,
  });

  return tableWithSeats;
};

const createTable = ({
  tableLeft,
  tableTop,
  tableWidth,
  tableHeight,
  seatTop,
  seatRight,
  seatBottom,
  seatLeft,
  tableId,
}: CreateTableProps) => {
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
    top: topSeats?.length ? -seatHeight - 5 : 0,
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
    top: bottomSeats.length ? tableHeight + 5 : 0,
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
    left: leftSeats.length ? -seatHeight - 5 : 0,
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
    left: rightSeats?.length ? tableWidth + 5 : 0,
    lockScalingX: true,
  });

  const tableWithSeats: TableGroup = new fabric.Group(
    [topSeatGrp, table, bottomSeatGrp, leftSeatGrp, rightSeatGrp],
    {
      top: tableTop,
      left: tableLeft,
      cornerStyle: "circle",
      cornerSize: 10,
      lockUniScaling: false,
    }
  );
  tableWithSeats.table_data = {
    bottom_seat: seatBottom,
    left_seat: seatLeft,
    right_seat: seatRight,
    top_seat: seatTop,
  };

  tableWithSeats.id = tableId;

  return tableWithSeats;
};

export { createTable, createCircularTable };

type CreateTableProps = {
  tableLeft: number;
  tableTop: number;
  tableWidth: number;
  tableHeight: number;
  seatTop: number;
  seatRight: number;
  seatBottom: number;
  seatLeft: number;
  tableId: string;
};

type CreateCircularTableProps = {
  seatCount: number;
  radius: number;
};
