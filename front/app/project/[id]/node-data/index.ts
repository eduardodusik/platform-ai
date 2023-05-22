import { NODE_IDS_ENUM } from "@/app/project/[id]/node-data/NodeTypes";
import { GPT_CONFIG } from "@/app/project/[id]/node-data/gpt";
import { START_CONFIG } from "@/app/project/[id]/node-data/start";
import { NodeDataBase } from "@/components/project/nodes/customNodeTypes";

export const AvailableNodes: Record<NODE_IDS_ENUM, NodeDataBase> = {
  [NODE_IDS_ENUM.GPT]: GPT_CONFIG,
  [NODE_IDS_ENUM.START]: START_CONFIG,
};
