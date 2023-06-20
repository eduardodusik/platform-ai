"use client";

import { ReactFlow, Background, ReactFlowProvider, Edge, useReactFlow } from "reactflow";
import { neutral } from "tailwindcss/colors";
import {
  NodeDataBase, NodeTypeMap,
} from "@/components/project/nodes/customNodeTypes";
import SimpleNode from "@/components/project/nodes/simpleNode";
import "reactflow/dist/style.css";
import Drawer from "@/components/project/Drawer";
import { RFState, useRFState } from "../../../store/FlowStore";
import { useCallback, useEffect, useRef } from "react";
import NodeStart from "@/components/project/nodes/start";
import { NODE_IDS_ENUM } from "@/app/project/[id]/node-data/NodeTypes";
import Cursor from "@/components/project/Cursor";
import { liveblocks, WithLiveblocks } from "@liveblocks/zustand";
import ElementsMenu from "@/components/project/ElementsMenu";

const selector = (state: WithLiveblocks<RFState>) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  liveblocks: state.liveblocks,
});

function WorkflowInstance() {
  const { onConnect, onEdgesChange, onNodesChange, edges, nodes, liveblocks: { room, others } } =
    useRFState(selector);

  const reactFlowRef = useReactFlow();

  const onPaneMouseMove = useCallback((event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const position = reactFlowRef.project({
      x: event.clientX - rect.top,
      y: event.clientY - rect.left,
    });
    console.log(position);
    room?.updatePresence({
      cursor: {
        x: position.x,
        y: position.y,
      },
    });
  }, [reactFlowRef, room]);

  return (
    <div className="w-full h-full">
      <ElementsMenu />
      <ReactFlow
        onPaneMouseMove={onPaneMouseMove}
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
        {others.map(({ connectionId, presence }) => {
          if (presence.cursor === null) {
            return null;
          }

          return (
            <Cursor
              key={`cursor-${connectionId}`}
              // connectionId is an integer that is incremented at every new connections
              // Assigning a color with a modulo makes sure that a specific user has the same colors on every clients
              color={COLORS[connectionId % COLORS.length]}
              x={(presence?.cursor as { x: number, y: number }).x}
              y={(presence?.cursor as { x: number, y: number }).y}
              scale={reactFlowRef.getZoom()}
            />
          );
        })}
        <Background gap={12} size={1} color={neutral[800]} />
      </ReactFlow>
    </div>
  );
}

const nodeTypes: NodeTypeMap = {
  [NODE_IDS_ENUM.GPT]: SimpleNode,
  [NODE_IDS_ENUM.START]: NodeStart,
  [NODE_IDS_ENUM.WHISPER]: SimpleNode,
};


type ReactFlowCompProps = {
  projectId: string;
}

const COLORS = [
  "#E57373",
  "#9575CD",
  "#4FC3F7",
  "#81C784",
  "#FFF176",
  "#FF8A65",
  "#F06292",
  "#7986CB",
];


export default function ReactFlowComp({ projectId }: ReactFlowCompProps) {
  const { enterRoom, leaveRoom, isStorageLoading } = useRFState(state => state.liveblocks);
  const reset = useRFState(state => state.reset);
  const initial = useRef(false);

  useEffect(() => {
    if (!initial.current) {
      reset();
      initial.current = true;
      enterRoom(projectId);
      return;
    }
    return () => leaveRoom(projectId);
  }, [enterRoom, leaveRoom, projectId, reset]);

  if (isStorageLoading) return (<div>Loading...</div>);

  return (
    <Board />
  );
}


export function Board() {
  return (
    <ReactFlowProvider>
      <WorkflowInstance />
      <Drawer />
    </ReactFlowProvider>
  );
}