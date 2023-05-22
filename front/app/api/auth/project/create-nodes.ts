"use server";

import { Edge, Node } from "reactflow";
import { NodeDataBase } from "@/components/project/nodes/customNodeTypes";
import prisma from "@/lib/prisma";
import { Variable } from "../../../../store/FlowStore";
import { Project } from "@/app/api/auth/project/types";

export async function getNodes() {
  return await prisma.node.findMany({
    include: {
      values: true,
    },
  });
}

export async function createProject (projectId: string, nodes?: Node<NodeDataBase>[], edges?: Edge[], variables?: Variable[]) {
  return await prisma.project.upsert({
    where: {
      id: projectId,
    },
    create: {
      name: 'Projeto teste',
      nodesData: nodes,
      edgesData: edges,
      variablesData: variables

    },
    update: {
      nodesData: nodes,
      edgesData: edges,
      variablesData: variables
    },
  });
}

export async function createNewProject () {
  return await prisma.project.create({
    data: {
      name: 'Projeto teste',
    },
  });
}

export async function findProject ({id}: {id: string}) {
  return await prisma.project.findUnique({
    where: {
      id: id
    }
  });
}

export async function getProjects () {
  return await prisma.project.findMany() as unknown as Project[];
}