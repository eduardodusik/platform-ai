"use server";

import prisma from "@/lib/prisma";
import { Project } from "@/app/api/project/types";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { cookies, headers } from 'next/headers';
import { getServerSession as originalGetServerSession } from 'next-auth';

export const getServerSession = async () => {
  const req = {
    headers: Object.fromEntries(headers() as Headers),
    cookies: Object.fromEntries(
      cookies()
        .getAll()
        .map((c) => [c.name, c.value]),
    ),
  };
  const res = { getHeader() {}, setCookie() {}, setHeader() {} };

  // @ts-ignore - The type used in next-auth for the req object doesn't match, but it still works
  const session = await originalGetServerSession(req, res, authOptions);
  return session;
};

export async function createNewProject() {
  const session = await getServerSession();

  if (session)
    return await prisma.project.create({
      data: {
        name: "Projeto teste",
        ownerId: session?.user.id,
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
  const session = await originalGetServerSession(authOptions);
  console.log("session", session);
  const response = await prisma.project.findMany({
    where: {
      ownerId: session?.user.id,
    },
  }) as unknown as Project[];
  console.log(response);
  return response;
//   @TODO: Retornar erro quando nao existe sessao
}