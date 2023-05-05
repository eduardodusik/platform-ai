import * as Dialog from '@radix-ui/react-dialog';
import {NodeOption} from "@/components/dashboard/nodes/customNodeTypes";
import cx from "classnames";
import * as Separator from '@radix-ui/react-separator';


type DrawerProps = {
  open: boolean
  onClose: () => void
  nodeOption?: NodeOption
  nodeId?: string;
  onChangeValue: (nodeId: string, categoryId: string, valueId: string, newValue: string) => void
}
export default function Drawer ({open, onClose, nodeOption, onChangeValue, nodeId}: DrawerProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Content className={cx(
          "pt-20 z-10 fixed top-0 right-0 h-screen w-96 bg-neutral-900",
          "border-l border-neutral-800",
          "p-4"
        )}>
          <Dialog.Title>
            <div className="text text-white font-bold text-2xl">{nodeOption?.name}</div>
            <Separator.Root className="w-full h-[1px] bg-neutral-800" style={{ margin: '15px 0' }} />
          </Dialog.Title>
          <Dialog.Description className="text-white flex flex-col gap-3">
            {nodeOption?.values?.map((value) => (
              <input className="text-black" key={value.name} placeholder={value.name} value={value?.value as string} onChange={(ev) => onChangeValue(nodeId as string, nodeOption?.id, value.name, ev.target.value)} />
            ))}
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}