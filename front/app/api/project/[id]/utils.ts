import { Edge, Node } from "reactflow";
import { NodeDataBase } from "@/components/project/nodes/customNodeTypes";
import { StartData } from "@/components/project/nodes/start/start.type";


type CreateSchemaProps = {
  nodes: Node<NodeDataBase>[];
  edges: Edge[];
}

export type NodeSchema = {
  type: string;
  values?: {
    [key: string]:  any;
  }
  // @TODO: Melhorar isso para o nodeSchema ser algo generico e o start ter seu proprio schema
  parameters?: {
    name: string
  }[]
}

const nodeStartSchema = (node: Node<StartData>): NodeSchema[] => {
  return [{
    type: "START",
    values: {},
    parameters: node.data.parameters

  }]
}

export const createSchema = ({nodes, edges}:CreateSchemaProps) => {
  const nodeStart = nodes.find(node => node.type === "START");

  let schema: NodeSchema[][]  = [nodeStartSchema(nodeStart as unknown as Node<StartData>)]
  let source: string[] | undefined = nodeStart?.id && [nodeStart?.id] || []

  for (const index in nodes) {
    const sourceNodes = nodes.filter(node => source?.includes(node.id));
    const targetIds = edges.filter(edge => source?.includes(edge.source)).map(edge => edge.target);

    if (source?.length) {
      const newNodes: NodeSchema[] | undefined = sourceNodes.map(node => {
        // @TODO: O start nem deveria passar por aqui.
        if (node.type === "START") return undefined;

        return {
          type: node.type as string,
          values: node.data.categories.flatMap(category => category.values.map(value => {
            return {
              [value.name]: value.value
            }
          })),
        }
      }).filter(node => node !== undefined) as NodeSchema[];

      // @TODO: O start está adicionando um array vazio, precisa melhorar isso para remover essa condição.
      newNodes.length && schema.push(newNodes);
    }

    source = targetIds;

    if (schema.flatMap(x => x).length === nodes.length) {
      break;
    }

  }


  return schema;
}