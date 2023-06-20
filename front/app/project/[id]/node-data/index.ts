import { NODE_IDS_ENUM } from "@/app/project/[id]/node-data/NodeTypes";
import { GPT_CONFIG } from "@/app/project/[id]/node-data/gpt";
import { START_CONFIG } from "@/app/project/[id]/node-data/start";
import { NodeDataBase } from "@/components/project/nodes/customNodeTypes";
import { WHISPER_CONFIG } from "@/app/project/[id]/node-data/whisper";
import { StartData } from "@/components/project/nodes/start/start.type";

export const AvailableNodes: Record<NODE_IDS_ENUM, NodeDataBase | StartData> = {
  [NODE_IDS_ENUM.GPT]: GPT_CONFIG,
  [NODE_IDS_ENUM.START]: START_CONFIG,
  [NODE_IDS_ENUM.WHISPER]: WHISPER_CONFIG,
};
