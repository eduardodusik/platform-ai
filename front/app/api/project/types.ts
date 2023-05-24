import { Edge, Node } from "reactflow";
import { NodeDataBase } from "@/components/project/nodes/customNodeTypes";
import { Variable } from "../../../store/FlowStore";

export interface NodePayload {
  id?: string;
  localId: string;
  positionX: number,
  positionY: number,
  name: string;
  type: string;
  values: NodeValue[];
}

export interface NodeValue {
  categoryId: string;
  fieldKey: string;
  value: any;
}

export interface Project {
  id: string;
  name: string;
  nodesData:Node<NodeDataBase>[];
  edgesData: Edge[];
  variablesData: Variable[];
  createdAt: Date;
  updatedAt: Date;
}