"use client";
import { useCallback } from "react";
import { useRFState } from "../../../store/FlowStore";
import Link from "next/link";
import { Project } from "@/app/api/project/types";
import cx from "classnames";
import { usePublishDialog } from "@/components/project/PublishDialog";

type PageProps = {
  project: Project | null
}

export default function Nav({ project }: PageProps) {
  const onOpen = usePublishDialog(state => state.onOpen)
  const { nodes, edges, variables } = useRFState((state) => ({
    nodes: state.nodes,
    variables: state.variables,
    edges: state.edges,
  }));

  const onPublish = useCallback(() => {
    // createProject(project?.id as string, nodes, edges, variables)
    onOpen()
    // fetch(`../api/project/${project?.id}`, {
    //   method: "POST",
    //   body: JSON.stringify({
    //     nodes,
    //     edges,
    //   }),
    // });
  }, [onOpen]);


  return (
    <div
      className="px-10 fixed py-6 top-0 z-30 pl-3 pr-3 flex h-12 w-full items-center justify-between border-b border-neutral-700 bg-black">
      <div>
        Hi
      </div>
      <div className="text-sm text-white/70">
        <Link className="cursor-pointer" href="/dashboard">Dashboard</Link> / {project?.name ?? "new project"}
      </div>
      <div className="flex gap-5">
        <button className={cx(
          "border-white rounded text-black border-2 px-4 py-1.5 text-sm transition-all bg-white hover:bg-transparent hover:text-white"
        )} onClick={onPublish}>
          Publish
        </button>
      </div>
    </div>
  );
}