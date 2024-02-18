import { Group, Object } from "fabric/fabric-impl";

export interface Floor {
  id: string;
  canvas: string;
  floor_no: number;
}

export interface TableGroup extends Group {
  id?: string;
  floor_id?: string;
}

export interface TableObject extends Object {
  id?: string;
  floor_id?: string;
}
