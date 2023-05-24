"use server";

import prisma from "@/lib/prisma";
import { Project } from "@/app/api/auth/project/types";

export async function getNodes() {
  return await prisma.node.findMany({
    include: {
      values: true,
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
  const response = await prisma.project.findUnique({
    where: {
      id: id
    }
  });

  return response as Project | null;
}

export async function getProjects () {
  return await prisma.project.findMany() as unknown as Project[];
}