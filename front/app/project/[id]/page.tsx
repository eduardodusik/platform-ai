import ReactFlowComp from "@/components/project/ReactFlowInstance";

type props = {
  params: {
    id: string
  }
}
export default async function ProjectPage({ params }: props) {
  return (
    <>
      <ReactFlowComp
        projectId={params.id}
      />
    </>
  );
}
