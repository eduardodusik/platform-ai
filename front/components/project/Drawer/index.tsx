"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { Field, NodeOption } from "@/components/project/nodes/customNodeTypes";
import cx from "classnames";
import * as Separator from "@radix-ui/react-separator";
import { DynamicForm } from "@/components/DynamicForm";
import { useRFState } from "../../../store/FlowStore";
import { useDrawerStore } from "@/components/project/Drawer/store";

type DrawerProps = {
  open: boolean;
  onClose: () => void;
  nodeOption?: NodeOption;
  nodeId?: string;
};
export default function Drawer() {
  const drawerStore = useDrawerStore();
  const { open, onClose, nodeId, nodeOption } = drawerStore;
  const { onChangeValue } = useRFState((state) => ({
    onChangeValue: state.onChangeValue,
  }));
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Content
          className={cx(
            "fixed top-0 right-0 z-10 h-screen w-96 bg-neutral-900 pt-20",
            "border-l border-neutral-800",
            "p-4",
          )}
        >
          <Dialog.Title>
            <div className="text text-2xl font-bold text-white">
              {nodeOption?.name}
            </div>
            <Separator.Root
              className="h-[1px] w-full bg-neutral-800"
              style={{ margin: "15px 0" }}
            />
          </Dialog.Title>
          <Dialog.Description className="flex flex-col gap-3 text-white">
            <DynamicForm
              fields={nodeOption?.values as Field[]}
              onChange={(fieldName, newValue) =>
                onChangeValue(
                  nodeId as string,
                  nodeOption?.id as string,
                  fieldName,
                  newValue,
                )
              }
            />
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
