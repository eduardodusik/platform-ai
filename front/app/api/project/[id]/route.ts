import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { Edge, Node } from "reactflow";
import { NodeDataBase } from "@/components/project/nodes/customNodeTypes";
import prisma from "@/lib/prisma";


type NodeSchema = {
  type: string;
  values: {
    [key: string]:  any;
  }
}

type SchemaPayload = {
  id: string;
  projectId: string;
  schema: NodeSchema[][] | null;
}

// @ts-ignore
export async function POST(request: Request, { params }) {
  const { id } = params
  const res = await request.json();
  const nodes = res.nodes as Node<NodeDataBase>[];
  const edges = res.edges as Edge[];

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
  const response = await prisma.apiSchema.upsert({
    where: {
      projectId: id,
    },
    create: {
      projectId: params.id,
      schema: schema,
    },
    update: {
      schema: schema
    }
  })
  return NextResponse.json({
    schema: response,
  });
}


// @ts-ignore
export async function GET(request: Request, { params }) {
  const { id } = params;
  const schema = await prisma.apiSchema.findUnique({
    where: {
      projectId: id,
    }
  })

  const response = await fetch('http://127.0.0.1:8000/project', {
    method: 'POST',
    body: JSON.stringify({nodes: schema?.schema}),
    cache: 'no-cache',
    headers: {
      'content-type': 'application/json'
    }
  })
  const projectResponse = await response.json()
  return NextResponse.json(projectResponse);
}