import ReactFlowComp from "@/components/project/ReactFlowInstance";
import Nav from "@/components/project/Nav";
import { NodeDataBase } from "@/components/project/nodes/customNodeTypes";
import { Edge, Node } from "reactflow";
import { findProject } from "@/app/api/project/create-nodes";

type props = {
  params: {
    id: string
  }
}

export default async function ProjectPage({ params }: props) {
  const project = await findProject({ id: params.id })
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Nav project={project} />
      <ReactFlowComp
        projectId={params.id}
        nodes={project?.nodesData as unknown as Node<NodeDataBase>[]}
        edges={project?.edgesData as unknown as Edge[]}
      />
    </div>
  );
}
