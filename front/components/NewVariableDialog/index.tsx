"use client";

import { create } from "zustand";
import * as Dialog from "@radix-ui/react-dialog";
import cx from "classnames";
import * as Form from "@radix-ui/react-form";
import { useCallback } from "react";
import { useRFState } from "../../store/FlowStore";
import { RxCross2 } from "react-icons/rx";

type VariableStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
import { AnimatePresence, motion, useAnimation } from "framer-motion";

export const useVariableStore = create<VariableStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));


export default function NewVariableDialog() {
  const { isOpen, onClose } = useVariableStore();
  const { addVariable, variables } = useRFState((state) => ({
    addVariable: state.onCreateNewVariable,
    variables: state.variables,
  }));

  const handleAdd = useCallback((data: { [key: string]: FormDataEntryValue }) => {
    if (data.variable.length && !variables.some((v) => v.key === data.variable)) {
      addVariable(data.variable as string);
    }
  }, [addVariable, variables]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose} modal>
      <Dialog.Portal className="bg-fuchsia-400">
        <Dialog.Overlay className="bg-black/80 fixed inset-0 z-20" />

        <Dialog.Content className={cx("fixed top-1/2 left-1/2 z-20 w-[90vw] rounded bg-black text-white",
          "max-w-[450px] max-h-[85vh] -translate-x-1/2 -translate-y-1/2",
          "border border-neutral-800",
          "p-8")}>

          <div className="flex justify-between">
            <Dialog.Title className="font-bold text-xl">Create new variable</Dialog.Title>
            <Dialog.Close asChild>
              <button className="IconButton transition-transform hover:rotate-12" aria-label="Close">
                <RxCross2 />
              </button>
            </Dialog.Close>
          </div>


          <Form.Root onSubmit={
            ev => {
              ev.preventDefault();

              const data = Object.fromEntries(new FormData(ev.currentTarget));
              handleAdd(data);
              onClose();
            }
          } className="pt-4">
            <Form.Field name="variable" className="flex flex-col gap-1">
              <Form.Label className="text-md font-semibold">New variable</Form.Label>
              <Form.Control
                asChild
                placeholder="my_incrible_variable"
                className={cx(
                  "box-border",
                  "focus:border-amber-700 focus:ring-0 ",
                  "rounded border-neutral-500 bg-transparent text-white",
                  "hover:border-amber-800",
                )}
              >
                <input
                  type="text"
                  defaultValue=""
                />
              </Form.Control>
            </Form.Field>

            <div className="flex justify-end pt-4">
              <Form.Submit asChild>
                <button
                  type="submit"
                  className="bg-white hover:bg-transparent border hover:border-white text-black hover:text-white font-semibold rounded px-4 py-2">
                  Add variable
                </button>
              </Form.Submit>
            </div>
          </Form.Root>

        </Dialog.Content>

      </Dialog.Portal>
    </Dialog.Root>
  );
}