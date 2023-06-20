import * as Dialog from "@radix-ui/react-dialog";
import cx from "classnames";
import * as Separator from "@radix-ui/react-separator";
import { Dispatch, SetStateAction, useCallback, useMemo, useState } from "react";
import * as Form from "@radix-ui/react-form";
import { useRFState } from "../../../../store/FlowStore";
import { StartData } from "@/components/project/nodes/start/start.type";
import { Node } from "reactflow";


export default function DrawerConfig({ parameterIndex, drawerIsOpen, setDrawerIsOpen }: {
  drawerIsOpen: boolean;
  setDrawerIsOpen: () => void;
  parameterIndex: number | null
}) {
  const { onChangeValue, nodes } = useRFState(state => ({
    onChangeValue: state.onUpdateInitialParameter,
    nodes: state.nodes,
  }));

  const parameterValue = useMemo(() => {
    const nodeStart = nodes.find(node => node.type ===  "START");
    if (nodeStart) {
      return (nodeStart as unknown as Node<StartData>).data.parameters[parameterIndex as number];
    }
  }, [nodes, parameterIndex]);

  return (
    <Dialog.Root open={drawerIsOpen} onOpenChange={setDrawerIsOpen}>
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
              Add parameter
            </div>
            <Separator.Root
              className="h-[1px] w-full bg-neutral-800"
              style={{ margin: "15px 0" }}
            />
          </Dialog.Title>
          <Dialog.Description className="flex flex-col gap-3 text-white">
            <span className="text-neutral-500 text-sm">
              Introduce parameters that the API is designed to accept.
            </span>

            <Form.Root className="pt-3">
              <Form.Field name="versionName" className="flex flex-col gap-1">
                <Form.Label className="text-sm font-semibold">API parameter</Form.Label>
                <Form.Control
                  asChild
                  placeholder="e.g. audio_file"
                  onChange={(e) => {
                    onChangeValue(parameterIndex as number, e.target.value);
                  }}
                  className={cx(
                    "box-border",
                    "focus:border-amber-700 focus:ring-0 ",
                    "rounded border-neutral-500 bg-transparent text-white",
                    "hover:border-amber-800",
                  )}
                >
                  <input
                    type="text"
                    defaultValue={parameterValue?.name}
                  />
                </Form.Control>
              </Form.Field>
            </Form.Root>
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function useDrawerConfig() {
  const [showDrawerConfig, setShowDrawerConfig] = useState(false);
  const [parameterIndex, setParameterIndex] = useState<number | null>(null);
  const onOpenDrawerConfig = useCallback((parameterIndex: number) => {
    setParameterIndex(parameterIndex);
    setShowDrawerConfig(true);
  }, []);

  const onCloseDrawerConfig = useCallback(() => {
    setShowDrawerConfig(false);
    setParameterIndex(null);
  }, []);

  const DrawerConfigCallback = useCallback(() => {
    return (
      <DrawerConfig
        parameterIndex={parameterIndex}
        drawerIsOpen={showDrawerConfig}
        setDrawerIsOpen={onCloseDrawerConfig}
      />
    );
  }, [showDrawerConfig]);

  return useMemo(() => ({
    onOpenDrawerConfig,
    DrawerConfig: DrawerConfigCallback,
  }), [DrawerConfigCallback, onOpenDrawerConfig]);
}