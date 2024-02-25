import { Group, Object } from "fabric/fabric-impl";

export interface Floor {
  id: string;
  canvas: string;
  floor_no: number;
}

export interface TableGroup extends Group {
  id?: string;
  floor_id?: string;
  table_data?: TableData;
}

export interface TableObject extends Object {
  id?: string;
  floor_id?: string;
  table_data?: TableData;
}

export type TableData = {
  top_seat?: number;
  left_seat?: number;
  bottom_seat?: number;
  right_seat?: number;
};
