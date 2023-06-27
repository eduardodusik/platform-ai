import ReactFlowComp from "@/components/project/ReactFlowInstance";
import Nav from "@/components/project/Nav";
import { findLiveBlockProject, findProject } from "@/app/(actions)/project";

type props = {
  params: {
    id: string
  }
}
export default async function ProjectPage({ params }: props) {
  const project = await findLiveBlockProject({ id: params.id });
  console.log('project', project)
  return (
    <>
      <Nav project={project} />
      <ReactFlowComp
        projectId={params.id}
      />
    </>
  );
}
