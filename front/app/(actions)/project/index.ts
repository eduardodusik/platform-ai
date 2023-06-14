"use server";

import prisma from "@/lib/prisma";
import { Project } from "@/app/api/project/types";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { cookies, headers } from "next/headers";
import { getServerSession as originalGetServerSession } from "next-auth";

export const getServerSession = async () => {
  const req = {
    headers: Object.fromEntries(headers() as Headers),
    cookies: Object.fromEntries(
      cookies()
        .getAll()
        .map((c) => [c.name, c.value]),
    ),
  };
  const res = {
    getHeader() {
    }, setCookie() {
    }, setHeader() {
    },
  };

  // @ts-ignore - The type used in next-auth for the req object doesn't match, but it still works
  return await originalGetServerSession(req, res, authOptions);
};

export async function createNewProject() {
  const session = await getServerSession();
  console.log("session", session);
  if (!session?.user?.id) throw new Error("No session found");

  const projectCrated = await prisma.project.create({
    data: {
      name: "Projeto teste",
      ownerId: session?.user.id,
    },
  });

  if (projectCrated.id) {
    await prisma.userProject.create({
      data: {
        userId: session?.user?.id,
        projectId: projectCrated.id,
      }
    });
  }
}

export async function findProject({ id }: { id: string }) {
  const session = await originalGetServerSession(authOptions);

  if (!session?.user?.id) throw new Error("No session found");

  const userProject = await prisma.userProject.findFirst({
    where: {
      userId: session.user.id,
      projectId: id,
    },
  });

  if (!userProject) throw new Error("Project not found");

  const response = await prisma.project.findUnique({
    where: {
      id,
    },
  });

  return response as unknown as Project || null;
}


export async function getProjects() {
  const session = await originalGetServerSession(authOptions);
  if (!session?.user?.id) throw new Error("No session found");

  const response = await prisma.project.findMany({
    where: {
      ownerId: session?.user?.id,
    },
  }) as unknown as Project[];
  return response;
//   @TODO: Retornar erro quando nao existe sessao
}