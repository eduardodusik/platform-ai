import { ComponentType, ReactNode } from "react";
import NodeGPT from "@/components/dashboard/nodes/gpt";
import dynamic from "next/dynamic";

type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "boolean"
  | "select"
  | "multi-select";
type DynamicValue = string | string[] | number | boolean;

export type SelectOption = {
  key: string;
  value?: DynamicValue;
  placeholder?: string;
};

export type Field = {
  name: string;
  value: DynamicValue;
  defaultValue?: DynamicValue;
  type?: FieldType;
  selectOptions?: SelectOption[];
};

export type NodeOption = {
  id: string;
  name: string;
  icon?: ReturnType<typeof dynamic>;
  values: Field[];
};

export type NodeDataBase = {
  name: string;
  categories?: NodeOption[];
  availableConfig?: NodeOption[];
  onEditName?: (nodeId: string, newName: string) => void;
  onOptionClick?: (nodeId: string, nodeOption: NodeOption) => void;
  onConfigChange?: (
    nodeId: string,
    checked: boolean,
    newCategory: NodeOption,
  ) => void;
};

export type NodeAvailableConfig = NodeOption & {
  type: CustomNodesKeys;
};

export type CustomNodesKeys = "start" | "gpt";
export type NodeTypeMap = Record<CustomNodesKeys, typeof NodeGPT>;
