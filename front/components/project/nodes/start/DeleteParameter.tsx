import * as Dialog from "@radix-ui/react-dialog";
import cx from "classnames";
import * as Separator from "@radix-ui/react-separator";
import { Dispatch, SetStateAction, useCallback, useMemo, useState } from "react";
import * as Form from "@radix-ui/react-form";
import { useRFState } from "../../../../store/FlowStore";
import { StartData } from "@/components/project/nodes/start/start.type";
import { Node } from "reactflow";
import { RxCross2 } from "react-icons/rx";


export default function DeleteParameter({ parameterIndex, drawerIsOpen, setDrawerIsOpen }: {
  drawerIsOpen: boolean;
  setDrawerIsOpen: () => void;
  parameterIndex: number | null
}) {
  const { onRemoveInitialParameter } = useRFState(state => ({
    onRemoveInitialParameter: state.onRemoveInitialParameter,
  }));

  const onRemoveParameter = useCallback(() => {
    onRemoveInitialParameter(parameterIndex as number);
    setDrawerIsOpen();
  }, [onRemoveInitialParameter, parameterIndex, setDrawerIsOpen]);

  return (
    <Dialog.Root open={drawerIsOpen} onOpenChange={setDrawerIsOpen}>
      <Dialog.Portal className="bg-fuchsia-400">
        <Dialog.Overlay className="bg-black/80 fixed inset-0 z-30" />

        <Dialog.Content className={cx("fixed top-1/2 left-1/2 z-30 w-[90vw] rounded bg-black text-white",
          "max-w-[450px] max-h-[85vh] -translate-x-1/2 -translate-y-1/2",
          "border border-neutral-800",
          "p-8")}>

          <div className="flex justify-between">
            <Dialog.Title className="font-bold text-xl">Delete variable</Dialog.Title>
            <Dialog.Close asChild>
              <button className="IconButton transition-transform hover:rotate-12" aria-label="Close">
                <RxCross2 />
              </button>
            </Dialog.Close>
          </div>
          <span>
              Are you sure you want to remove the parameter?
            </span>
          <div className="pt-3 flex justify-end">
            <button
              className="cursor-pointer rounded p-2 bg-transparent border hover:border-red-600 hover:text-red-600 text-white border-white transition-colors"
              onClick={onRemoveParameter}
            >
              Delete
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function useDeleteParameter() {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [parameterIndex, setParameterIndex] = useState<number | null>(null);

  const onOpenDeleteDialog = useCallback((parameterIndex: number) => {
    setParameterIndex(parameterIndex);
    setShowDeleteDialog(true);
  }, []);

  const onCloseDrawerConfig = useCallback(() => {
    setShowDeleteDialog(false);
    setParameterIndex(null);
  }, []);

  const DeleteParameterCallback = useCallback(() => {
    return (
      <DeleteParameter
        parameterIndex={parameterIndex}
        drawerIsOpen={showDeleteDialog}
        setDrawerIsOpen={onCloseDrawerConfig}
      />
    );
  }, [onCloseDrawerConfig, parameterIndex, showDeleteDialog]);

  return useMemo(() => ({
    onOpenDeleteDialog,
    DeleteParameter: DeleteParameterCallback,
  }), [DeleteParameterCallback, onOpenDeleteDialog]);
}