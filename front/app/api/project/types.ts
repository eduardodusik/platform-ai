import { Edge, Node } from "reactflow";
import { NodeDataBase } from "@/components/project/nodes/customNodeTypes";
import { Variable } from "../../../store/FlowStore";

export interface Project {
  id: string;
  name: string;
  nodesData:Node<NodeDataBase>[];
  edgesData: Edge[];
  variablesData: Variable[];
  createdAt: Date;
  updatedAt: Date;
}