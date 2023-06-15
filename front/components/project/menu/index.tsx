"use client";

import { RxStack, IoIosSettings } from "react-icons/all";
import cx from "classnames";
import Tooltip from "@/components/shared/tooltip";
import Link from "next/link";



export default function Menu({projectId}: {projectId: string}) {
  return (
    <div className="absolute left-0 top-0 flex h-full items-center gap-3">
      <div className="h-full w-16 border-r border-neutral-700 bg-black">
        <div className="flex flex-col gap-8 items-center justify-start pt-28 h-full">
          <div className={cx(
            "cursor-pointer",
          )}>
            <Tooltip content="Workflow">
              <Link
                href="/project/[id]"
                as={`/project/${projectId}`}
                className={cx(
                  "text-amber-700 text-xl",
                )}>
                <RxStack />
              </Link>
            </Tooltip>
          </div>

          <div className={cx(
            "cursor-pointer",
          )}>
            <Tooltip content="Settings">
              <Link
                href="/project/[id]/settings"
                as={`/project/${projectId}/settings`}
                className={cx(
                  "text-amber-700 text-xl",
                )}>
                <IoIosSettings />
              </Link>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}
