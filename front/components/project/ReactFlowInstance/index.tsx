"use client";

import { Node, ReactFlow, Background, ReactFlowProvider, Edge } from "reactflow";
import { neutral } from "tailwindcss/colors";
import {
  NodeDataBase, NodeTypeMap,
} from "@/components/project/nodes/customNodeTypes";
import SimpleNode from "@/components/project/nodes/simpleNode";
import "reactflow/dist/style.css";
import Drawer from "@/components/project/Drawer";
import Menu from "@/components/project/menu";
import { RFState, useRFState } from "../../../store/FlowStore";
import { useCallback, useEffect } from "react";
import NodeStart from "@/components/project/nodes/start";
import { NODE_IDS_ENUM } from "@/app/project/[id]/node-data/NodeTypes";

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
    </>
  );
}

const nodeTypes: NodeTypeMap = {
  [NODE_IDS_ENUM.GPT]: SimpleNode,
  [NODE_IDS_ENUM.START]: NodeStart,
};


type ReactFlowCompProps = {
  nodes: Node<NodeDataBase>[],
  edges: Edge[]
}
export default function ReactFlowComp({ nodes, edges }: ReactFlowCompProps) {
  const { setNodes, setEdges } = useRFState(state => ({
    setNodes: state.setNodes,
    setEdges: state.setEdges,
  }));

  console.log({ edges });

  // const parseNodes = useCallback(() => {
  //
  //   const newNodes = nodes.map(node => {
  //     const nodeTemplate = AvailableNodes[node.type as NODE_IDS_ENUM];
  //     const configs = [...nodeTemplate?.availableConfig, ...nodeTemplate?.categories];
  //
  //     const newNode: Node<NodeDataBase> = {
  //       id: node.id as string,
  //       type: node.type as string,
  //       position: {
  //         x: node.positionX,
  //         y: node.positionY,
  //       },
  //       data: {
  //         id: node.type as NODE_IDS_ENUM,
  //         name: node.name,
  //         availableConfig: nodeTemplate.availableConfig?.filter(config => !node.values.some(value => value.categoryId === config.id)),
  //         categories: configs
  //           ?.filter(config => node.values.some(value => value.categoryId === config.id))
  //           ?.map(category => {
  //             return {
  //               ...category,
  //               values: category.values.map(item => ({
  //                 ...item,
  //                 value: node.values.find(value => value.categoryId === category.id && value.fieldKey === item.name)?.value
  //               }))
  //             }
  //           }),
  //       },
  //     };
  //     return newNode;
  //
  //   });
  //
  //   setNodes(newNodes);
  // }, [nodes, setNodes]);

  const parseNodes = useCallback(() => {
    setNodes(nodes || []);
    setEdges(edges || []);
  }, [edges, nodes, setEdges, setNodes]);

  useEffect(() => {
    parseNodes();
  }, [parseNodes]);

  return (
    <ReactFlowProvider>
      <WorkflowInstance />
      <Menu />
      <Drawer />
    </ReactFlowProvider>
  );
}
