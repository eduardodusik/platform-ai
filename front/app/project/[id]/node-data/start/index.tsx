import { NODE_IDS_ENUM } from "@/app/project/[id]/node-data/NodeTypes";
import { NodeDataBase } from "@/components/project/nodes/customNodeTypes";
import { StartData } from "@/components/project/nodes/start/start.type";


export const START_CONFIG: StartData = {
  id: NODE_IDS_ENUM.START,
  parameters: []
}