"use client";

import ElementsMenu from "@/components/project/ElementsMenu";
import { RxStack, IoIosSettings } from "react-icons/all";
import cx from "classnames";
import Tooltip from "@/components/shared/tooltip";

export default function Menu() {
  return (
    <div className="fixed left-0 top-10 flex h-full items-center gap-3">
      <div className="h-full w-16 border-r border-neutral-700 bg-black">
        <div className="flex flex-col gap-8 items-center justify-start pt-28 h-full">
          <div className={cx(
            "cursor-pointer"
          )}>
            <Tooltip content="Workflow">
              <button className={cx(
                "text-amber-700 text-xl"
              )}>
                <RxStack />
              </button>
            </Tooltip>
          </div>

          <div className={cx(
            "cursor-pointer"
          )}>
            <Tooltip content="Settings">
              <button className={cx(
                "text-amber-700 text-xl"
              )}>
                <IoIosSettings />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
      <ElementsMenu />
    </div>
  );
}
