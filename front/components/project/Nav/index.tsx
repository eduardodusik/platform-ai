"use client";
import { useCallback } from "react";
import { useRFState } from "../../../store/FlowStore";
import Link from "next/link";
import { Project } from "@/app/api/project/types";

type PageProps = {
  project: Project | null
}

export default function Nav({ project }: PageProps) {
  const { nodes, edges, variables } = useRFState((state) => ({
    nodes: state.nodes,
    variables: state.variables,
    edges: state.edges,
  }));

  const onPublish = useCallback(() => {
    // createProject(project?.id as string, nodes, edges, variables)
    fetch(`../api/project/${project?.id}`, {
      method: "POST",
      body: JSON.stringify({
        nodes,
        edges,
      }),
    });
  }, [edges, project?.id, nodes]);

  const onTest = useCallback(() => {
    fetch(`../api/project/${project?.id}`)
  }, [project?.id])

  return (
    <div
      className="fixed top-0 z-30 flex h-10 w-full items-center justify-between border-b border-neutral-700 bg-black">
      <div />
      <div className="text-sm text-white/70">
        <Link className="cursor-pointer" href="/dashboard">Dashboard</Link> / {project?.name ?? "new project"}
      </div>
      <div className="flex gap-5">
        <button onClick={onTest}>
          Teste
        </button>
        <button onClick={onPublish}>
          Publish
        </button>
      </div>
    </div>
  );
}