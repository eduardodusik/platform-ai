import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import NewVariableDialog from "@/components/NewVariableDialog";
import PublishDialog from "@/components/project/PublishDialog";
import Menu from "@/components/project/menu";

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
};
type props = {
  params: {
    id: string
  }
}

export default async function ProjectLayout({ children, params }: {
  children: React.ReactNode;
} & props) {
  await checkUserProject({ id: params.id });

  return (
    <div className="h-full w-full text-white bg-neutral-900">
      <div className="relative" style={{ width: "100vw", height: "100vh" }}>
        <NewVariableDialog />
        <PublishDialog projectId={params?.id} />
        {children}
        <Menu projectId={params.id} />
      </div>
    </div>
  );
}


