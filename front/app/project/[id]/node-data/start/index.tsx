import { NODE_IDS_ENUM } from "@/app/project/[id]/node-data/NodeTypes";
import { NodeDataBase } from "@/components/project/nodes/customNodeTypes";


export const START_CONFIG: NodeDataBase = {
  id: NODE_IDS_ENUM.START,
  name: 'Start',
  availableConfig: [],
  categories: []
}