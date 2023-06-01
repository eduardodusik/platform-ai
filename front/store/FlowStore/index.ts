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
} from "reactflow";
import {
  NodeDataBase,
  NodeOption,
} from "@/components/project/nodes/customNodeTypes";
import { create } from "zustand";
import { produce } from "immer";
import { devtools } from "zustand/middleware";
import { createClient } from "@liveblocks/client";
import type { WithLiveblocks } from "@liveblocks/zustand";
import { liveblocks } from "@liveblocks/zustand";
import { START_CONFIG } from "@/app/project/[id]/node-data/start";

export type Variable = {
  key: string;
};

type Cursor = { x: number; y: number };

const client = createClient({
  publicApiKey: process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY as string,
  throttle: 16, // Updates every 16ms === 60fps animation
});



export interface RFState {
  nodes: Node<NodeDataBase>[];
  edges: Edge[];
  cursor: Cursor;
  setCursor: (cursor: Cursor) => void;
  setNodes: (nodes: Node<NodeDataBase>[]) => void;
  setEdges: (edges: Edge[]) => void;
  variables: Variable[];
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
  onCreateNewVariable: (key: string, nodeId?: string) => void;
  reset: () => void
}

const nodes: Node<NodeDataBase>[] = [
  {
    id: '1',
    type: "START",
    position: { x: 100, y: 250 },
    data: START_CONFIG,
  },
];

const initial_state = {
  nodes: nodes,
  edges: [],
  cursor: { x: 0, y: 0 },
  variables: [],
}

export const useRFState = create<WithLiveblocks<RFState>>()(
  devtools(
    liveblocks(
      ((set, get) => {
        // const setState = (callback: (store: RFState) => void) =>
        //   set(produce(callback));
        return {
          ...initial_state,
          setNodes: (nodes: Node<NodeDataBase>[]) => {
            set({
              nodes: nodes,
            });
          },
          setCursor: (cursor) => set({ cursor }),
          setEdges: (edges: Edge[]) => {
            set({
              edges: edges,
            });
          },
          onCreateNewVariable: (key: string) => {
            set({
              variables: [...get().variables, { key }],
            })
          },
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
            const newNodes = structuredClone(get().nodes);
            const node = newNodes.find((n) => n.id === nodeId);

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
            set({
              nodes: newNodes,
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
          reset: () => {
            set(initial_state)
          }
        };
      }), {
        // Add Liveblocks client
        client,
        presenceMapping: { cursor: true },
        // Define the store properties that should be shared in real-time
        storageMapping: {
          nodes: true,
          edges: true,
          variables: true,
        },
      },
    ),
  ));
