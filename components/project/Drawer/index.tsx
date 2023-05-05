import * as Dialog from '@radix-ui/react-dialog';
import {NodeOption} from "@/components/dashboard/nodes/customNodeTypes";
import cx from "classnames";
import * as Separator from '@radix-ui/react-separator';


type DrawerProps = {
  open: boolean
  onClose: () => void
  nodeOption?: NodeOption
}
export default function Drawer ({open, onClose, nodeOption}: DrawerProps) {
  console.log(nodeOption)
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        {/*<Dialog.Overlay  />*/}
        <Dialog.Content className={cx(
          "pt-20 z-10 fixed top-0 right-0 h-screen w-96 bg-neutral-900",
          "border-l border-neutral-800",
          "p-4"
        )}>
          <Dialog.Title>
            <h1 className="text-white font-bold text-2xl">{nodeOption?.name}</h1>
            <Separator.Root className="w-full h-[1px] bg-neutral-800" style={{ margin: '15px 0' }} />
          </Dialog.Title>
          <Dialog.Description className="text-white">Drawer</Dialog.Description>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}