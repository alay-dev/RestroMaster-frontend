import { fabric } from "fabric";

const spaceBetweenSeat = 5;
const seatEdgeSpace = 10;
const seatHeight = 30;

const createTable = ({
  tableLeft,
  tableTop,
  tableWidth,
  tableHeight,
  seatTop,
  seatRight,
  seatBottom,
  seatLeft,
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

  const tableWithSeats = new fabric.Group(
    [topSeatGrp, table, bottomSeatGrp, leftSeatGrp, rightSeatGrp],
    {
      top: tableTop,
      left: tableLeft,
      cornerStyle: "circle",
      cornerSize: 10,
      lockUniScaling: false,
    }
  );

  return tableWithSeats;
};

export default createTable;

type CreateTableProps = {
  tableLeft: number;
  tableTop: number;
  tableWidth: number;
  tableHeight: number;
  seatTop: number;
  seatRight: number;
  seatBottom: number;
  seatLeft: number;
};
