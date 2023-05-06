"use client";

import {
  addEdge,
  Node,
  ReactFlow,
  useEdgesState,
  useNodesState,
  Background,
} from "reactflow";
import { neutral } from "tailwindcss/colors";
import {
  NodeDataBase,
  NodeOption,
  NodeTypeMap,
} from "@/components/dashboard/nodes/customNodeTypes";
import { useCallback, useEffect, useState } from "react";
import NodeStart from "@/components/dashboard/nodes/start";
import NodeGPT from "@/components/dashboard/nodes/gpt";
import "reactflow/dist/style.css";
import Drawer from "@/components/project/Drawer";

type ModalDetails = {
  isOpen: boolean;
  nodeId?: string;
  nodeOption?: NodeOption;
};

type WorkflowProps = {
  nodeData: Node<NodeDataBase>[];
};

export default function WorkflowInstance({ nodeData }: WorkflowProps) {
  const [modalDetails, setModalDetails] = useState<ModalDetails>({
    isOpen: false,
  });

  const handleOpenOptionDetails = useCallback(
    (nodeId: string, nodeOption: NodeOption) => {
      setModalDetails({ isOpen: true, nodeOption, nodeId });
    },
    [],
  );

  const handleCloseDrawer = useCallback(() => {
    setModalDetails({ isOpen: false });
  }, []);

  const [nodes, setNodes, onNodesChange] =
    useNodesState<NodeDataBase>(nodeData);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  console.log({ nodes });

  const addNewConfig = useCallback(
    (nodeId: string, checked: boolean, newCategory: NodeOption) => {
      const newNodes = nodes.map((node) => {
        if (node.id === nodeId) {
          if (checked) node.data.categories?.push(structuredClone(newCategory));
          else
            node.data.categories = node.data.categories?.filter(
              (x) => x.id !== newCategory.id,
            );
          return node;
        }

        return node;
      });
      setNodes(newNodes);
    },
    [nodes, setNodes],
  );

  const onConnect = useCallback(
    (params: any) => setEdges((eds: any) => addEdge(params, eds)),
    [setEdges],
  );

  const onChangeValue = useCallback(
    (nodeId: string, categoryId: string, fieldKey: string, newValue: any) => {
      const node = nodes.find((node) => node.id === nodeId);

      if (node) {
        const category = node.data?.categories?.find(
          (category) => category.id === categoryId,
        );

        if (category) {
          const value = category.values.find(
            (value) => value.name === fieldKey,
          );

          if (value) {
            value.value = newValue;
            const newNodes = nodes.filter((x) => x.id !== nodeId);
            console.log(node);
            setNodes([...newNodes, node]);
          }
        }
      }
    },
    [nodes, setNodes],
  );

  const onEditNodeName = useCallback(
    (nodeId: string, newName: string) => {
      setNodes((prevState) =>
        prevState.map((node) => {
          if (node.id === nodeId) {
            node.data.name = newName;
            return node;
          }
          return node;
        }),
      );
    },
    [setNodes],
  );

  const setUpNodes = (nodesToConfig: typeof nodes): typeof nodes => {
    return nodesToConfig?.map((node) => ({
      ...node,
      data: {
        ...node?.data,
        onOptionClick: handleOpenOptionDetails,
        onConfigChange: addNewConfig,
        onEditName: onEditNodeName,
      },
    }));
  };

  return (
    <>
      <ReactFlow
        className="bg-neutral-900"
        nodes={setUpNodes(nodes)}
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

      <Drawer
        onChangeValue={onChangeValue}
        open={modalDetails.isOpen}
        onClose={handleCloseDrawer}
        nodeId={modalDetails?.nodeId}
        nodeOption={modalDetails?.nodeOption}
      />
    </>
  );
}

const nodeTypes: NodeTypeMap = {
  start: NodeStart,
  gpt: NodeGPT,
};
