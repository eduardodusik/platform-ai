import * as Dialog from '@radix-ui/react-dialog';

type DrawerProps = {
  open: boolean
}
export default function Drawer ({open}: DrawerProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <button className="text-white/70 text-sm">
          Open
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay  />
        <Dialog.Content className="z-10 fixed top-0 right-0 h-screen w-96 bg-neutral-900">
          <Dialog.Title className="text-white">Drawer</Dialog.Title>
          <Dialog.Description className="text-white">Drawer</Dialog.Description>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}