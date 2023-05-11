"use client";

import {
  Node,
  ReactFlow,
  Background,
  useReactFlow,
  ReactFlowProvider,
} from "reactflow";
import { neutral } from "tailwindcss/colors";
import {
  CustomNodesKeys,
  NodeDataBase,
  NodeOption,
  NodeTypeMap,
} from "@/components/project/nodes/customNodeTypes";
import SimpleNode from "@/components/project/nodes/simpleNode";
import "reactflow/dist/style.css";
import Drawer from "@/components/project/Drawer";
import Menu from "@/components/project/menu";
import { RFState, useRFState } from "../../../store/FlowStore";

type WorkflowProps = {
  nodeData: Node<NodeDataBase>[];
};

const selector = (state: Partial<RFState>) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

function WorkflowInstance() {
  const { onConnect, onEdgesChange, onNodesChange, edges, nodes } =
    useRFState(selector);
  return (
    <>
      <ReactFlow
        className="bg-neutral-900"
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        proOptions={{ hideAttribution: true }}
        fitView
      >
        <Background gap={12} size={1} color={neutral[800]} />
      </ReactFlow>

      <Menu />
      <Drawer />
    </>
  );
}

const nodeTypes: NodeTypeMap = {
  gpt: SimpleNode,
};

export default function ReactFlowComp() {
  return (
    <ReactFlowProvider>
      <WorkflowInstance />
    </ReactFlowProvider>
  );
}
