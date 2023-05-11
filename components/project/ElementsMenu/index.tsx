import cx from "classnames";
import { BsBodyText, HiSparkles, SiOpenai } from "react-icons/all";
import * as Menubar from "@radix-ui/react-menubar";
import {
  CustomNodesKeys,
  NodeDataBase,
} from "@/components/project/nodes/customNodeTypes";
import { NODE_IDS_ENUM } from "@/app/project/node-data/NodeTypes";
import { useRFState } from "../../../store/FlowStore";
import { Node, useReactFlow } from "reactflow";
import { useCallback } from "react";
import { AvailableNodes } from "@/app/project/node-data";

export default function ElementsMenu() {
  // const { onAddNode } = useRFState((state) => ({ onAddNode: state.onAddNode }));
  const { addNodes } = useReactFlow();

  const onAddNode = useCallback(
    (nodeType: CustomNodesKeys, nodeId: NODE_IDS_ENUM) => {
      const newNode: Node<NodeDataBase> = {
        id: self.crypto.randomUUID(),
        type: nodeType,
        position: { x: 200, y: 250 },
        data: structuredClone(AvailableNodes[nodeId]),
      };

      addNodes(newNode);
    },
    [addNodes],
  );
  return (
    <Menubar.Root>
      <div
        className={cx(
          "flex flex-col gap-4 rounded-2xl bg-black p-3",
          "hover:shadow-lg hover:shadow-amber-800/5",
        )}
      >
        {[
          { name: "OpenAI", icon: <SiOpenai size="30" /> },
          { name: "LLM", icon: <BsBodyText size="30" /> },
          { name: "Models", icon: <HiSparkles size="30" /> },
        ].map((item) => (
          <NodeItem
            key={item.name}
            onAddNewNode={onAddNode}
            name={item.name}
            icon={item.icon}
          />
        ))}
      </div>
    </Menubar.Root>
  );
}

interface NodeItemProps {
  name: string;
  icon: JSX.Element;
  onAddNewNode: (nodeType: CustomNodesKeys, nodeId: NODE_IDS_ENUM) => void;
}

function NodeItem({ name, icon, onAddNewNode }: NodeItemProps) {
  return (
    <Menubar.Menu>
      <Menubar.Trigger>
        <div
          className={cx(
            "flex cursor-pointer flex-col items-center gap-2 rounded-2xl p-2 text-xs hover:bg-amber-600",
            "rdx-state-open:bg-amber-600",
          )}
        >
          {icon}
          {name}
        </div>
      </Menubar.Trigger>

      <Menubar.Portal>
        <Menubar.Content
          align="start"
          side="right"
          sideOffset={16}
          alignOffset={8}
          className={cx(
            "rdx-side-top:animate-slide-up rdx-side-bottom:animate-slide-down",
            "w-48 rounded-lg px-1.5 py-1 shadow-md md:w-56",
            "bg-black dark:bg-black",
          )}
        >
          <Menubar.Item
            onClick={() => onAddNewNode("gpt", NODE_IDS_ENUM.GPT)}
            className=" cursor-pointer rounded p-1 text-white hover:bg-neutral-900"
          >
            GPT
          </Menubar.Item>
          <Menubar.Item className="cursor-pointer rounded p-1 text-white hover:bg-neutral-900">
            Whisper
          </Menubar.Item>
        </Menubar.Content>
      </Menubar.Portal>
    </Menubar.Menu>
  );
}
