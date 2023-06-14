import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { Project } from "@/app/api/project/types";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({error: "No session found"}, { status: 401 });

  const response = await prisma.project.findMany({
    where: {
      ownerId: session?.user.id,
    },
  }) as unknown as Project[];

  return NextResponse.json<Project[]>(response);
}