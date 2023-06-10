"use client";

import { create } from "zustand";
import * as Dialog from "@radix-ui/react-dialog";
import cx from "classnames";
import * as Form from "@radix-ui/react-form";
import { useCallback, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useRFState } from "../../../store/FlowStore";

type VariableStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const usePublishDialog = create<VariableStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

type props = {
  projectId: string
}


export default function PublishDialog({ projectId }: props) {
  const { isOpen, onClose } = usePublishDialog();
  const [isLoading, setLoading] = useState(false)
  const { nodes, edges, variables } = useRFState((state) => ({
    nodes: state.nodes,
    variables: state.variables,
    edges: state.edges,
  }));

  const onPublish = useCallback(async (description: string) => {
    // createProject(project?.id as string, nodes, edges, variables)
    try {
      setLoading(true)
      await fetch(`../api/project/${projectId}`, {
        method: "POST",
        body: JSON.stringify({
          nodes,
          edges,
          description: description,
        }),
      });
    } catch (err) {

    } finally {
      setLoading(false)
    }

  }, [edges, projectId, nodes]);

  const handleAdd = useCallback((data: { [key: string]: FormDataEntryValue }) => {
    onPublish(data.versionName as string)
  }, [onPublish]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose} modal>
      <Dialog.Portal className="bg-fuchsia-400">
        <Dialog.Overlay className="bg-black/80 fixed inset-0 z-30" />

        <Dialog.Content className={cx("fixed top-1/2 left-1/2 z-30 w-[90vw] rounded bg-black text-white",
          "max-w-[450px] max-h-[85vh] -translate-x-1/2 -translate-y-1/2",
          "border border-neutral-800",
          "p-8")}>

          <div className="flex justify-between">
            <Dialog.Title className="font-bold text-xl">Publish new version</Dialog.Title>
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
            }
          } className="pt-4">
            <Form.Field name="versionName" className="flex flex-col gap-1">
              <Form.Label className="text-md font-semibold">Enter a version name</Form.Label>
              <Form.Control
                asChild
                disabled={isLoading}
                placeholder="e.g. add whisper"
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
                  disabled={isLoading}
                  className="bg-white hover:bg-transparent border hover:border-white text-black hover:text-white font-semibold rounded px-4 py-2">
                  {isLoading ? "Publishing..." : "Publish"}
                </button>
              </Form.Submit>
            </div>
          </Form.Root>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}