"use client";
import { useCallback } from "react";
import { useRFState, UserMeta } from "../../../store/FlowStore";
import Link from "next/link";
import { Project } from "@/app/api/project/types";
import cx from "classnames";
import { usePublishDialog } from "@/components/project/PublishDialog";
import Image from "next/image";
import { useInviteDialog } from "@/components/project/InviteMembers";

type PageProps = {
  project: Project | null
}

export default function Nav({ project }: PageProps) {
  const onOpen = usePublishDialog(state => state.onOpen);
  const { liveblocks, nodes, edges, variables } = useRFState((state) => ({
    nodes: state.nodes,
    variables: state.variables,
    edges: state.edges,
    liveblocks: state.liveblocks,
  }));

  const { InviteMembers, onOpenDialog } = useInviteDialog();

  const me = liveblocks?.room?.getSelf();
  const others = liveblocks?.room?.getOthers();

  const onPublish = useCallback(() => {
    onOpen();
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
        <div className="flex">
          {
            others?.map((other) => (
              <div key={other?.id} style={{ borderColor: (other?.info as unknown as UserMeta)?.color }}
                   className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border transition-all duration-75 focus:outline-none active:scale-95 sm:h-9 sm:w-9">
                <Image
                  alt={(other?.info as unknown as UserMeta)?.name}
                  src={(other?.info as unknown as UserMeta)?.image}
                  width={30}
                  height={30}
                />
              </div>
            ))
          }

          {me && <div
            style={{ borderColor: (me?.info as unknown as UserMeta)?.color }}
            className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border transition-all duration-75 focus:outline-none active:scale-95 sm:h-9 sm:w-9">
            <Image
              alt={(me?.info as unknown as UserMeta)?.name}
              src={(me?.info as unknown as UserMeta)?.image}
              width={30}
              height={30}
            />
          </div>}
        </div>
        <button onClick={onOpenDialog} className="hover:bg-neutral-800 px-2 rounded">
          Share
        </button>

        <button className={cx(
          "border-white rounded text-black border-2 px-4 py-1.5 text-sm transition-all bg-white hover:bg-transparent hover:text-white",
        )} onClick={onPublish}>
          Publish
        </button>
      </div>
      <InviteMembers projectId={project?.id as string} />
    </div>
  );
}