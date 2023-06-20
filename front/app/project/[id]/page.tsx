import ReactFlowComp from "@/components/project/ReactFlowInstance";
import Nav from "@/components/project/Nav";
import { findProject } from "@/app/(actions)/project";

type props = {
  params: {
    id: string
  }
}
export default async function ProjectPage({ params }: props) {
  const project = await findProject({ id: params.id });
  return (
    <>
      <Nav project={project} />
      <ReactFlowComp
        projectId={params.id}
      />
    </>
  );
}
