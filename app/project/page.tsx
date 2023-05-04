"use client";
import {addEdge, Controls, ReactFlow, useEdgesState, useNodesState, Node} from "reactflow";
import 'reactflow/dist/style.css';
import {memo, useCallback} from "react";
import {Background} from '@reactflow/background';
import {neutral} from 'tailwindcss/colors'
import NodeStart from "@/components/dashboard/nodes/start";
import NodeGPT from "@/components/dashboard/nodes/gpt";
import {NodeDataBase} from "@/components/dashboard/nodes/customNodeTypes";
import dynamic from "next/dynamic";
import Drawer from "@/components/project/Drawer";

const nodeTypes = {
  start: NodeStart,
  gpt: NodeGPT
}

// @ts-ignore
const getDynamicIcon = (iconName: string) => dynamic(() => import("react-icons/all").then(module => module[iconName]), {ssr: false})


export default function ProjectPage() {
  const initialNodes: Node<NodeDataBase>[] = [
    {
      id: '4',
      type: 'gpt',
      position: {x: 200, y: 250},
      data: {
        name: 'GPT Models',
        onEditName: (nodeId, newName) => console.log(nodeId, newName),
        onOptionClick: (nodeId, newData) => console.log(nodeId, newData),
        values: [
          {
            id: 'open-ai',
            name: 'OpenAI',
            form: [{
              name: 'llm',
              value: 'OpenAI',
              type: 'text',
            }]
          },
        ]
      }
    },
  ];
  const [nodes, setNodes, onNodesChange] = useNodesState<NodeDataBase>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback((params: any) => setEdges((eds: any) => addEdge(params, eds)), [setEdges]);

  return (
    <div style={{width: '100vw', height: '100vh'}}>
      <div className="z-10 fixed h-10 w-full bg-black top-0 flex items-center justify-between">
        <div/>
        <div className="text-white/70 text-sm">
          Drafts / new model
        </div>
        <Drawer open />
        <div/>
      </div>
      <ReactFlow
        className="bg-neutral-900"
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        proOptions={{hideAttribution: true}}
        fitView
      >
        <Controls/>
        <Background gap={12} size={1} color={neutral[800]}/>
      </ReactFlow>
    </div>
  )
}


