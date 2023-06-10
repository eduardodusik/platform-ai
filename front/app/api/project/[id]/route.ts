import { NextResponse } from "next/server";
import { Edge, Node } from "reactflow";
import { NodeDataBase } from "@/components/project/nodes/customNodeTypes";
import prisma from "@/lib/prisma";
import { createSchema } from "@/app/api/project/[id]/utils";


// @ts-ignore
export async function POST(request: Request, { params }) {
  const res = await request.json();
  const nodes = res.nodes as Node<NodeDataBase>[];
  const edges = res.edges as Edge[];
  const description = res.description as string;
  const schema = createSchema({ nodes, edges });

  try {
    const response = await prisma.apiSchema.create({
      data: {
        projectId: params.id,
        schema: schema,
      },
    });

    await prisma.versions.create({
      data: {
        projectId: params.id,
        schemaId: response.id,
        description: description,
      },
    });

    return NextResponse.json({
      ...response,
    });
  } catch (error) {
    return NextResponse.error();
  }
  
}
