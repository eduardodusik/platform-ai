"use server";

import prisma from "@/lib/prisma";
import { Project } from "@/app/api/project/types";
import { Edge, Node } from "reactflow";
import { NodeDataBase } from "@/components/project/nodes/customNodeTypes";
import { Variable } from "../../../store/FlowStore";

export async function createProject(projectId: string, nodes?: Node<NodeDataBase>[], edges?: Edge[], variables?: Variable[]) {
  return await prisma.project.upsert({
    where: {
      id: projectId,
    },
    create: {
      name: "Projeto teste",
      nodesData: nodes as {},
      edgesData: edges as {},
      variablesData: variables,

    },
    update: {
      nodesData: nodes as {},
      edgesData: edges as {},
      variablesData: variables,
    },
  });
}

export async function createNewProject() {
  return await prisma.project.create({
    data: {
      name: "Projeto teste",
    },
  });
}

export async function findProject({ id }: { id: string }) {
  const response = await prisma.project.findUnique({
    where: {
      id: id,
    },
  });

  return response as unknown as Project || null;
}

export async function getProjects() {
  return await prisma.project.findMany() as unknown as Project[];
}