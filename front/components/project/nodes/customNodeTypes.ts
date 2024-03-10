import { NODE_IDS_ENUM } from "@/app/project/[id]/node-data/NodeTypes";

type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "boolean"
  | "select"
  | "multi-select"
  | "set-env"
  | "use-env";
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
  // icon?: IconType;
  values: Field[];
};

export type NodeDataBase = {
  id: NODE_IDS_ENUM;
  name: string;
  categories: NodeOption[];
  availableConfig: NodeOption[];
  setVariableKey?: string;
};

export type NodeAvailableConfig = NodeOption & {
  type: CustomNodesKeys;
};

export type CustomNodesKeys = NODE_IDS_ENUM;
export type NodeTypeMap = Record<CustomNodesKeys, any>;
