"use client";

import * as Dialog from "@radix-ui/react-dialog";
import cx from "classnames";
import * as Form from "@radix-ui/react-form";
import { useCallback, useMemo, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useRFState } from "../../../store/FlowStore";
import { inviteUserToProject } from "@/app/(actions)/project";

type VariableStore = {
  isOpen: boolean;
  onClose: () => void;
  projectId: string | null;
}

export const useInviteDialog = () => {
  const [showInviteMembers, setShowInviteMembers] = useState(false);
  const DialogCallback = useCallback(({projectId}: {projectId: string | null}) => {
    return (
      <InviteMembers isOpen={showInviteMembers} projectId={projectId} onClose={() => setShowInviteMembers(false)}  />
    )
  }, [showInviteMembers]);

  return useMemo(() => ({
    onOpenDialog: () => setShowInviteMembers(true),
    InviteMembers: DialogCallback,
  }), [DialogCallback]);
}


export default function InviteMembers({ isOpen, onClose, projectId }: VariableStore ) {
  const [isLoading, setLoading] = useState(false)
  const { nodes, edges, variables } = useRFState((state) => ({
    nodes: state.nodes,
    variables: state.variables,
    edges: state.edges,
  }));

  const onInvite = useCallback(async (email: string) => {
    try {
      setLoading(true)
      await inviteUserToProject({ projectId: projectId as string, userId: email });
    } catch (err) {
    } finally {
      setLoading(false)
    }

  }, [projectId]);

  const handleAdd = useCallback((data: { [key: string]: FormDataEntryValue }) => {
    onInvite(data.userEmail as string)
  }, [onInvite]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose} modal>
      <Dialog.Portal className="bg-fuchsia-400">
        <Dialog.Overlay className="bg-black/80 fixed inset-0 z-30" />

        <Dialog.Content className={cx("fixed top-1/2 left-1/2 z-30 w-[90vw] rounded bg-black text-white",
          "max-w-[450px] max-h-[85vh] -translate-x-1/2 -translate-y-1/2",
          "border border-neutral-800",
          "p-8")}>

          <div className="flex justify-between">
            <Dialog.Title className="font-bold text-xl">Share this workflow</Dialog.Title>
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
            <Form.Field name="userEmail" className="flex flex-col gap-1">
              <Form.Label className="text-md font-semibold">E-mail</Form.Label>
              <Form.Control
                asChild
                disabled={isLoading}
                placeholder="e.g. eduardo@acme.com"
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
                  {isLoading ? "Inviting..." : "Send invite"}
                </button>
              </Form.Submit>
            </div>
          </Form.Root>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

