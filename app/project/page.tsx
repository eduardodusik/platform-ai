import WorkflowInstance from "@/components/project/ReactFlowInstance";
import {
  NodeDataBase,
  NodeOption,
} from "@/components/project/nodes/customNodeTypes";
import { Node } from "reactflow";
import { GPT_CONFIG } from "@/app/project/node-data/gpt";

export default function ProjectPage() {
  const nodes: Node<NodeDataBase>[] = [
    {
      id: "4",
      type: "gpt",
      position: { x: 200, y: 250 },
      data: GPT_CONFIG,
    },
  ];

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div className="fixed top-0 z-20 flex h-10 w-full items-center justify-between border-b border-neutral-700 bg-black">
        <div />
        <div className="text-sm text-white/70">Drafts / new model</div>
        <div />
      </div>
      <WorkflowInstance nodeData={nodes} />
    </div>
  );
}
