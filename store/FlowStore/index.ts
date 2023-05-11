import {
  Edge,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  Node,
  NodeChange,
  applyNodeChanges,
  EdgeChange,
  applyEdgeChanges,
  Connection,
  addEdge,
  useReactFlow,
} from "reactflow";
import {
  CustomNodesKeys,
  NodeDataBase,
  NodeOption,
} from "@/components/project/nodes/customNodeTypes";
import { create } from "zustand";
import { GPT_CONFIG } from "@/app/project/node-data/gpt";
import { NODE_IDS_ENUM } from "@/app/project/node-data/NodeTypes";
import { AvailableNodes } from "@/app/project/node-data";
import { produce } from "immer";
import { devtools, persist } from "zustand/middleware";

export type RFState = {
  nodes: Node<NodeDataBase>[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  onEditNodeName: (nodeId: string, newName: string) => void;
  onChangeValue: (
    nodeId: string,
    categoryId: string,
    fieldKey: string,
    newValue: any,
  ) => void;
  addNewConfig: (
    nodeId: string,
    checked: boolean,
    newCategory: NodeOption,
  ) => void;
};

const nodes: Node<NodeDataBase>[] = [
  {
    id: "4",
    type: "gpt",
    position: { x: 200, y: 250 },
    data: GPT_CONFIG,
  },
];

export const useRFState = create<RFState>()(
  persist(
    (set, get) => {
      const setState = (callback: (store: RFState) => void) =>
        set(produce(callback));
      return {
        nodes: nodes,
        edges: [],
        onNodesChange: (changes: NodeChange[]) => {
          set({
            nodes: applyNodeChanges(changes, get().nodes),
          });
        },
        onEdgesChange: (changes: EdgeChange[]) => {
          set({
            edges: applyEdgeChanges(changes, get().edges),
          });
        },
        onConnect: (connection: Connection) => {
          set({
            edges: addEdge(connection, get().edges),
          });
        },
        onEditNodeName: (nodeId: string, newName: string) => {
          console.log(nodeId, newName);
          set({
            nodes: get().nodes.map((node) => {
              if (node.id === nodeId) {
                return {
                  ...node,
                  data: {
                    ...node.data,
                    name: newName,
                  },
                };
              }
              return node;
            }),
          });
        },
        onChangeValue: (
          nodeId: string,
          categoryId: string,
          fieldKey: string,
          newValue: any,
        ) => {
          console.log({ nodeId, categoryId, fieldKey, newValue });
          setState((store) => {
            const node = store.nodes.find((x) => x.id === nodeId);
            if (node) {
              const category = node.data.categories?.find(
                (item) => item.id === categoryId,
              );
              if (category) {
                const field = category.values.find(
                  (item) => item.name === fieldKey,
                );

                if (field) {
                  field.value = newValue;
                }
              }
            }
          });
        },
        addNewConfig: (
          nodeId: string,
          checked: boolean,
          newCategory: NodeOption,
        ) => {
          const newNodes = get().nodes.map((node) => {
            if (node.id === nodeId) {
              if (checked) {
                return {
                  ...node,
                  data: {
                    ...node.data,
                    categories: [
                      ...(node?.data?.categories || []),
                      structuredClone(newCategory),
                    ],
                  },
                };
              } else {
                return {
                  ...node,
                  data: {
                    ...node.data,
                    categories: node.data.categories?.filter(
                      (x) => x.id !== newCategory.id,
                    ),
                  },
                };
              }
            }

            return node;
          });
          set({ nodes: newNodes });
        },
      };
    },
    {
      name: "storage",
    },
  ),
);
