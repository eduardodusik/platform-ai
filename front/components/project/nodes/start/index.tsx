"use client";
import { Handle, NodeProps, Position } from "reactflow";
import { RxHome, RxPlus, RxCross2 } from "react-icons/rx";
import { useRFState } from "../../../../store/FlowStore";
import { useCallback } from "react";
import cx from "classnames";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { StartData } from "@/components/project/nodes/start/start.type";
import { useDrawerConfig } from "@/components/project/nodes/start/DrawerConfig";
import { useDeleteParameter } from "@/components/project/nodes/start/DeleteParameter";


export default function NodeStart(props: NodeProps<StartData>) {
  const { id: nodeId, dragging, isConnectable, data, selected } = props;
  const { DrawerConfig, onOpenDrawerConfig } = useDrawerConfig();
  const {onOpenDeleteDialog, DeleteParameter} = useDeleteParameter()
  return (
    <>
      <DeleteParameter />
      <DrawerConfig />
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
          <StartMenuConfig onOpenDrawerConfig={onOpenDrawerConfig} />
        </div>
        <div className="mt-2 flex flex-col gap-1 text-xs font-light">
          {
            data?.parameters?.map((parameter, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className={cx(
                  "flex justify-between items-center gap-2",
                  "min-h-full min-w-full rounded border border-neutral-800 bg-black px-2 py-1 text-xs",
                  "transition-colors hover:bg-neutral-700/90 hover:shadow-md",
                )} onClick={() => onOpenDrawerConfig(index)}>
                  <span>
                    {parameter.name}
                  </span>
                  <div
                    className="bg-neutral-900 cursor-pointer rounded-full p-1 hover:bg-neutral-800"
                    onClick={(ev) => {
                      ev.preventDefault();
                      ev.stopPropagation();
                      onOpenDeleteDialog(index);
                    }}
                  >
                    <RxCross2 size="8" />
                  </div>
                </div>
              </div>
            ))
          }

          {
            data?.parameters?.length === 0 && (
              <div className="text-neutral-500 text-xs flex items-center justify-center">
                Add parameters
              </div>
            )
          }
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
    </>
  );
}


function StartMenuConfig({ onOpenDrawerConfig }: { onOpenDrawerConfig: (parameterIndex: number) => void }) {

  return (
    <>
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
            <AddParameterOption onClick={(parameterIndex) => onOpenDrawerConfig(parameterIndex)} />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </>
  );
}


const AddParameterOption = ({ onClick }: { onClick: (parameterIndex: number) => void }) => {
  const { onAddInitialParameter } = useRFState(state => ({
    onAddInitialParameter: state.onAddInitialParameter,
  }));

  const handleAddParameter = useCallback(() => {
    onClick(onAddInitialParameter());
  }, [onAddInitialParameter, onClick]);

  return (
    <>
      <DropdownMenu.Item
        onClick={handleAddParameter}
        className={cx(
          "flex cursor-pointer select-none items-center gap-2 rounded-md px-2 py-2 text-xs outline-none",
          "text-white focus:bg-neutral-900 dark:text-white dark:focus:bg-neutral-600",
        )}
      >
        <span>Add parameter</span>
      </DropdownMenu.Item>
    </>
  );
};