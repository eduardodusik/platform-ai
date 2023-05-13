"use client";
import { Handle, NodeProps, Position } from "reactflow";
import cx from "classnames";
import { RxPlus } from "react-icons/rx";
import { useCallback } from "react";
import {
  NodeDataBase,
  NodeOption,
} from "@/components/project/nodes/customNodeTypes";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import { RxCheck } from "react-icons/rx";
import { useDrawerStore } from "@/components/project/Drawer/store";
import { useRFState } from "../../../../store/FlowStore";

export default function SimpleNode(props: NodeProps<NodeDataBase>) {
  const { id: nodeId, dragging, isConnectable, data, selected } = props;
  const { name, availableConfig } = data;
  const { onOpenDrawer } = useDrawerStore((state) => ({
    onOpenDrawer: state.onOpenDrawer,
  }));
  const { onConfigChange, onEditName } = useRFState((state) => ({
    onConfigChange: state.addNewConfig,
    onEditName: state.onEditNodeName,
  }));

  const handleOptionClick = useCallback(
    (option: NodeOption) => {
      onOpenDrawer(nodeId, option);
    },
    [nodeId, onOpenDrawer],
  );

  const handleAddNewCategory = useCallback(
    (checked: boolean, newConfig: NodeOption) => {
      onConfigChange?.(nodeId, checked, newConfig);
    },
    [onConfigChange, nodeId],
  );

  return (
    <div
      className={cx(
        dragging && "cursor-grabbing",
        "cursor-pointer rounded bg-black p-2",
        "border border-neutral-800",
        "min-h-[100px] min-w-[200px]",
        selected &&
          "border-amber-500 shadow-lg shadow-amber-800/10 transition-shadow",
      )}
    >
      <Handle
        isConnectable={isConnectable}
        type="target"
        position={Position.Left}
        id={`${nodeId}-in`}
        onConnect={(params) => console.log("handle onConnect", params)}
      />

      <div className="flex items-center justify-between gap-2">
        <input
          onChange={(ev) => onEditName?.(nodeId, ev.target.value)}
          className={cx(
            "text-xs text-neutral-500",
            "border-none bg-transparent outline-none",
            "rounded",
            "hover:bg-neutral-700",
          )}
          value={name}
        />
        <AvailableConfigMenu
          configs={availableConfig}
          addedConfigs={data?.categories}
          onConfigChange={handleAddNewCategory}
        />
      </div>
      <div className="mt-2 flex flex-col gap-1 text-xs font-light">
        {data?.categories?.map((value) => (
          <Option
            key={value.id}
            name={value.name}
            nodeId={nodeId}
            id={value.id}
            icon={value.icon}
            onClickOption={() => handleOptionClick(value)}
            values={value.values}
          />
        ))}
      </div>
      <Handle
        isConnectable={isConnectable}
        type="source"
        position={Position.Right}
        id={`${nodeId}-out`}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
    </div>
  );
}

type AvailableConfigMenuProps = {
  configs?: NodeOption[];
  onConfigChange: (checked: boolean, config: NodeOption) => void;
  addedConfigs?: NodeOption[];
};

function AvailableConfigMenu({
  configs,
  onConfigChange,
  addedConfigs,
}: AvailableConfigMenuProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <div className="rounded-full hover:bg-neutral-600">
          <RxPlus size={12} alignmentBaseline="middle" />
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="center"
          sideOffset={5}
          className={cx(
            "rdx-side-top:animate-slide-up rdx-side-bottom:animate-slide-down",
            "w-48 rounded-lg px-1.5 py-1 shadow-md md:w-56",
            "bg-white dark:bg-neutral-700",
          )}
        >
          <DropdownMenu.Arrow className="fill-current dark:text-neutral-700" />
          {configs?.map((value) => (
            <DropdownMenu.CheckboxItem
              key={value.id}
              onCheckedChange={(checked) => onConfigChange(checked, value)}
              checked={addedConfigs?.some((config) => config.id === value.id)}
              className={cx(
                "flex cursor-default select-none items-center gap-2 rounded-md px-2 py-2 text-xs outline-none",
                "text-white focus:bg-neutral-900 dark:text-white dark:focus:bg-neutral-600",
              )}
            >
              <DropdownMenu.ItemIndicator>
                <RxCheck />
              </DropdownMenu.ItemIndicator>
              <span>{value.name}</span>
            </DropdownMenu.CheckboxItem>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

type OptionProps = NodeOption & {
  nodeId: string;
  onClickOption: () => void;
};

function Option({ name, onClickOption, icon }: OptionProps) {
  return (
    <div
      onClick={onClickOption}
      className={cx(
        "flex items-center gap-2",
        "min-h-full min-w-full rounded border border-neutral-800 bg-black px-2 py-1 text-xs",
        "transition-colors hover:bg-neutral-700/90 hover:shadow-md",
      )}
    >
      {icon && icon({})}
      <span>{name}</span>
    </div>
  );
}
