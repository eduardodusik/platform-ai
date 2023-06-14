import ReactFlowComp from "@/components/project/ReactFlowInstance";
import Nav from "@/components/project/Nav";

import { findProject } from "@/app/(actions)/project";
import NewVariableDialog from "@/components/NewVariableDialog";
import PublishDialog from "@/components/project/PublishDialog";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

type props = {
  params: {
    id: string
  }
}

const checkUserProject = async ({ id }: { id: string }) => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) throw new Error("No session found");

  const userProject = await prisma.userProject.findFirst({
    where: {
      userId: session.user.id,
      projectId: id,
    },
  });

  if (!userProject) redirect("/404");
}

export default async function ProjectPage({ params }: props) {
  await checkUserProject({ id: params.id });
  const project = await findProject({ id: params.id })
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Nav project={project} />
      <NewVariableDialog />
      <PublishDialog projectId={params?.id} />
      <ReactFlowComp
        projectId={params.id}
      />
    </div>
  );
}
