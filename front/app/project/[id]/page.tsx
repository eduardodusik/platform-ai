import ReactFlowComp from "@/components/project/ReactFlowInstance";
import Nav from "@/components/project/Nav";
import { findProject } from "@/app/api/auth/project/create-nodes";
import { NodeDataBase } from "@/components/project/nodes/customNodeTypes";
import { Edge, Node } from "reactflow";

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
        nodes={project?.nodesData as unknown as Node<NodeDataBase>[]}
        edges={project?.edgesData as unknown as Edge[]}
      />
    </div>
  );
}
