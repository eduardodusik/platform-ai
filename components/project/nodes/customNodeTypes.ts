import { ComponentType, ReactElement, ReactNode } from "react";
import simpleNode from "@/components/project/nodes/simpleNode";
import dynamic from "next/dynamic";
import { IconType } from "react-icons/lib";
import { NODE_IDS_ENUM } from "@/app/project/node-data/NodeTypes";

type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "boolean"
  | "select"
  | "multi-select"
  | "set-env";
type DynamicValue = string | string[] | number | boolean | null | undefined;

export type SelectOption = {
  key: string;
  value?: DynamicValue;
  placeholder?: string;
};

export type Field = {
  name: string;
  value: DynamicValue;
  label: string;
  placeholder?: string;
  helperText?: string;
  defaultValue: DynamicValue;
  type: FieldType;
  selectOptions?: SelectOption[];
};

export type NodeOption = {
  id: string;
  name: string;
  icon?: IconType;
  values: Field[];
};

export type NodeDataBase = {
  id: NODE_IDS_ENUM;
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

export type CustomNodesKeys = "gpt";
export type NodeTypeMap = Record<CustomNodesKeys, typeof simpleNode>;
