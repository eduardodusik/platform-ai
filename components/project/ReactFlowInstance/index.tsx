import {
  addEdge,
  Node,
  ReactFlow,
  useEdgesState,
  useNodesState,
  Background,
} from "reactflow";
import {neutral} from "tailwindcss/colors";
import {NodeDataBase, NodeOption} from "@/components/dashboard/nodes/customNodeTypes";
import {useCallback, useState} from "react";
import NodeStart from "@/components/dashboard/nodes/start";
import NodeGPT from "@/components/dashboard/nodes/gpt";
import 'reactflow/dist/style.css';
import Drawer from "@/components/project/Drawer";

type ModalDetails = {
  isOpen: boolean
  nodeId?: string;
  nodeOption?: NodeOption
}
export default function ReactFlowInstance() {
  const [modalDetails, setModalDetails] = useState<ModalDetails>({isOpen: false})

  const handleOpenOptionDetails = useCallback((nodeId: string, nodeOption: NodeOption) => {
    setModalDetails({isOpen: true, nodeOption, nodeId})
  }, [])

  const handleCloseDrawer = useCallback(() => {
    setModalDetails({isOpen: false})
  }, [])

  const initialNodes: Node<NodeDataBase>[] = [
    {
      id: '4',
      type: 'gpt',
      position: {x: 200, y: 250},
      data: {
        name: 'Hello World LLM',
        onEditName: (nodeId, newName) => console.log(nodeId, newName),
        onOptionClick: handleOpenOptionDetails,
        categories: [
          {
            id: 'open-ai',
            name: 'Model',
            values: [
              {
                name: 'llm',
                value: 'OpenAI',
                type: 'text',
              }
            ]
          },
          {
            id: 'template',
            name: 'Template',
            values: [{
              name: 'Template',
              value: 'OpenAI',
              type: 'text',
            },
              {
                name: 'Variaveis',
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

  const onChangeValue = useCallback((nodeId: string, categoryId: string, fieldKey: string, newValue: any) => {
    const node = nodes.find((node) => node.id === nodeId);

    if  (node) {
      const category = node.data?.categories?.find((category) => category.id === categoryId);

      if (category) {
        const value = category.values.find((value) => value.name === fieldKey);

        if (value) {
          value.value = newValue;
          const newNodes = nodes.filter(x => x.id !== nodeId);
          setNodes([...newNodes, node])
        }
      }
    }
  }, [nodes, setNodes])

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
        proOptions={{hideAttribution: true}}
        fitView
      >
        <Background gap={12} size={1} color={neutral[800]}/>
      </ReactFlow>

      <Drawer
        onChangeValue={onChangeValue}
        open={modalDetails.isOpen}
        onClose={handleCloseDrawer}
        nodeId={modalDetails?.nodeId}
        nodeOption={modalDetails?.nodeOption}  />
    </>
  )
}

const nodeTypes = {
  start: NodeStart,
  gpt: NodeGPT
}