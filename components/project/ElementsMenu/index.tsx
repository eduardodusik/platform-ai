import cx from "classnames";
import { BsBodyText, SiOpenai, HiSparkles } from "react-icons/all";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useRef, useState } from "react";

export default function ElementsMenu() {
  return (
    <div
      className={cx(
        "flex flex-col gap-4 rounded-2xl bg-black p-3",
        "hover:shadow-lg hover:shadow-amber-800/5",
      )}
    >
      {/*<div className="flex cursor-pointer flex-col items-center gap-2 rounded-2xl p-2 text-xs hover:bg-amber-600">*/}
      {/*  <SiOpenai size="30" />*/}
      {/*  OpenAI*/}
      {/*</div>*/}
      {/*<div className="flex cursor-pointer flex-col items-center gap-2 rounded-2xl p-2 text-xs hover:bg-amber-600">*/}
      {/*  <BsBodyText size="30" />*/}
      {/*  LLM*/}
      {/*</div>*/}
      {/*<div className="flex cursor-pointer flex-col items-center gap-2 rounded-2xl p-2 text-xs hover:bg-amber-600">*/}
      {/*  <HiSparkles size="30" />*/}
      {/*  Models*/}
      {/*</div>*/}
      {/*<NodeItem />*/}
      {[
        { name: "OpenAI", icon: <SiOpenai size="30" /> },
        { name: "LLM", icon: <BsBodyText size="30" /> },
        { name: "Models", icon: <HiSparkles size="30" /> },
      ].map((item) => (
        <NodeItem key={item.name} name={item.name} icon={item.icon} />
      ))}
    </div>
  );
}

interface NodeItemProps {
  name: string;
  icon: JSX.Element;
}

function NodeItem({ name, icon }: NodeItemProps) {
  const [open, setOpen] = useState(false);
  return (
    <DropdownMenu.Root open={open} modal>
      <DropdownMenu.Trigger asChild>
        <div
          onMouseEnter={() => setOpen(true)}
          className={cx(
            "flex cursor-pointer flex-col items-center gap-2 rounded-2xl p-2 text-xs hover:bg-amber-600",
            "rdx-state-open:bg-amber-600",
          )}
        >
          {icon}
          {name}
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal onMouseLeave={() => setOpen(false)}>
        <DropdownMenu.Content
          align="start"
          side="right"
          sideOffset={10}
          alignOffset={2}
          hideWhenDetached
          onInteractOutside={() => setOpen(false)}
          className={cx(
            "rdx-side-top:animate-slide-up rdx-side-bottom:animate-slide-down",
            "w-48 rounded-lg px-1.5 py-1 shadow-md md:w-56",
            "bg-white dark:bg-neutral-700",
          )}
        >
          <div
            id="xxx"
            onMouseOver={() => setOpen(false)}
            onMouseLeave={() => setOpen(false)}
          >
            <DropdownMenu.Item>Option</DropdownMenu.Item>
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
