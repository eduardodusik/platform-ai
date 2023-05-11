import {
  CustomNodesKeys,
  NodeDataBase,
} from "@/components/project/nodes/customNodeTypes";
import { GPT_CONFIG } from "@/app/project/node-data/gpt";
import { NODE_IDS_ENUM } from "@/app/project/node-data/NodeTypes";

export const AvailableNodes: Record<NODE_IDS_ENUM, NodeDataBase> = {
  [NODE_IDS_ENUM.GPT]: GPT_CONFIG,
};
