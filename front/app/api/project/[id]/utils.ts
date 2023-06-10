import { Edge, Node } from "reactflow";
import { NodeDataBase } from "@/components/project/nodes/customNodeTypes";


type CreateSchemaProps = {
  nodes: Node<NodeDataBase>[];
  edges: Edge[];
}

export type NodeSchema = {
  type: string;
  values: {
    [key: string]:  any;
  }
}

export const createSchema = ({nodes, edges}:CreateSchemaProps) => {
  const nodeStart = nodes.find(node => node.type === "START");

  let schema: NodeSchema[][]  = []
  let source: string[] | undefined = nodeStart?.id && [nodeStart?.id] || []

  for (const index in nodes) {
    const sourceNodes = nodes.filter(node => source?.includes(node.id));
    const targetIds = edges.filter(edge => source?.includes(edge.source)).map(edge => edge.target);

    if (source?.length) {
      const newNodes: NodeSchema[] = sourceNodes.map(node => {
        return {
          type: node.type as string,
          values: node.data.categories.flatMap(category => category.values.map(value => {
            return {
              [value.name]: value.value
            }
          })),
        }
      })

      schema.push(newNodes);
    }

    source = targetIds;

    if (schema.flatMap(x => x).length === nodes.length) {
      break;
    }

  }


  return schema;
}