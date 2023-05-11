import { create } from "zustand";
import { NodeOption } from "@/components/project/nodes/customNodeTypes";

type DrawerState = {
  open: boolean;
  onOpenDrawer: (nodeId: string, nodeOption: NodeOption) => void;
  nodeId?: string;
  nodeOption?: NodeOption;
  onClose: () => void;
};

export const useDrawerStore = create<DrawerState>((set, get) => ({
  open: false,
  onOpenDrawer: (nodeId: string, nodeOption: NodeOption) => {
    set({
      open: true,
      nodeId,
      nodeOption,
    });
  },
  onClose: () => {
    set({
      open: false,
      nodeId: undefined,
      nodeOption: undefined,
    });
  },
}));
