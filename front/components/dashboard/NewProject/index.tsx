"use client";
import cx from "classnames";
import { RxPlus } from "react-icons/rx";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

import { createNewProject } from "@/app/(actions)/project";


export default function NewProject() {
  const router = useRouter();

  const handleCreateProject = useCallback(async () => {
    const newProject = await createNewProject()
    router.push(`/project/${newProject.id}`)
  }, [router])

  return (
    <div onClick={handleCreateProject} className={cx(
      "cursor-pointer text-sm px-4 border border-white py-2 rounded-md text-neutral-700 flex items-center gap-1 bg-white",
      "hover:bg-neutral-900 hover:text-white transition-colors",
    )}>
      New Model
      <RxPlus alignmentBaseline="middle" />
    </div>
  )
}