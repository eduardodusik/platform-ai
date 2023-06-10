"use client";
import { Handle, NodeProps, Position } from "reactflow";
import { RxHome } from "react-icons/rx";
import { NodeDataBase, NodeOption } from "@/components/project/nodes/customNodeTypes";
import { useDrawerStore } from "@/components/project/Drawer/store";
import { useRFState } from "../../../../store/FlowStore";
import { useCallback } from "react";
import cx from "classnames";
import { AvailableConfigMenu, Option } from "@/components/project/nodes/simpleNode";


export default function NodeStart(props: NodeProps<NodeDataBase>) {
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
        "min-w-[200px]",
        selected &&
        "border-amber-500 shadow-lg shadow-amber-800/10 transition-shadow",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <div className={cx(
          "flex gap-2 items-center text-xs text-neutral-500",
          "border-none bg-transparent outline-none",
          "rounded",
        )}>
          <RxHome />
          Start
        </div>
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
        className="bg-green-800"
      />
    </div>
  );
}
