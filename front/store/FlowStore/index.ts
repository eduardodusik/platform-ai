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

export type Variable = {
  key: string;
};

export interface RFState {
  nodes: Node<NodeDataBase>[];
  edges: Edge[];
  setNodes: (nodes: Node<NodeDataBase>[]) => void;
  setEdges: (edges:Edge[]) => void;
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
  onLinkNodeWithVariable: (nodeId: string, variableKey: string) => void;
}

// const nodes: Node<NodeDataBase>[] = [
//   {
//     id: self.crypto.randomUUID(),
//     type: "start",
//     position: { x: 100, y: 250 },
//     data: START_CONFIG,
//   },
//   {
//     id: "4",
//     type: "gpt",
//     position: { x: 200, y: 250 },
//     data: GPT_CONFIG,
//   },
// ];

export const useRFState = create<RFState>()(
  devtools(
      (set, get) => {
        const setState = (callback: (store: RFState) => void) =>
          set(produce(callback));

        return {
          nodes: [],
          edges: [],
          variables: [
            {
              key: "Var",
            },
          ],
          setNodes: (nodes: Node<NodeDataBase>[]) => {
            setState((store) => {
              store.nodes = nodes;
            });
          },
          setEdges: (edges: Edge[]) => {
            setState((store) => {
              store.edges = edges;
            });
          },
          onLinkNodeWithVariable: (nodeId: string, variableKey: string) => {
            setState((store) => {
              const node = store.nodes.findIndex((n) => n.id === nodeId);
              if (node > -1) {
                console.log("change");
                store.nodes[node].data.setVariableKey = variableKey;
              }
            });
          },
          onCreateNewVariable: (key: string) => {
            setState((store) => {
              store.variables.push({
                key,
              });
            });
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
  ),
);
