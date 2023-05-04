"use client"
import {
  addEdge,
  Node,
  ReactFlow,
  useEdgesState,
  useNodesState,
  Background,
} from "reactflow";
import {neutral} from "tailwindcss/colors";
import {NodeDataBase} from "@/components/dashboard/nodes/customNodeTypes";
import {useCallback} from "react";
import NodeStart from "@/components/dashboard/nodes/start";
import NodeGPT from "@/components/dashboard/nodes/gpt";
import 'reactflow/dist/style.css';


export default function ReactFlowInstance() {
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
      {/*<Controls/>*/}
      <Background gap={12} size={1} color={neutral[800]}/>
    </ReactFlow>
  )
}

const nodeTypes = {
  start: NodeStart,
  gpt: NodeGPT
}