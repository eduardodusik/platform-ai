import ReactFlowComp from "@/components/project/ReactFlowInstance";
import Nav from "@/components/project/Nav";
import { NodeDataBase } from "@/components/project/nodes/customNodeTypes";
import { Edge, Node } from "reactflow";

import { findProject } from "@/app/(actions)/project";
import NewVariableDialog from "@/components/NewVariableDialog";

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
      <NewVariableDialog />
      <ReactFlowComp
        projectId={params.id}
        nodes={project?.nodesData as unknown as Node<NodeDataBase>[]}
        edges={project?.edgesData as unknown as Edge[]}
      />
    </div>
  );
}
