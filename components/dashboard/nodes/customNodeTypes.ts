import {ComponentType, ReactNode} from "react";

type FieldType = 'text' | 'number' | 'boolean' | 'select' | 'multi-select';
type DynamicValue = string | string[] | number | boolean;

export type SelectOption = {
  key: string;
  value: DynamicValue;
  placeholder?: string
}

export type OptionForm = {
  name: string;
  value: DynamicValue;
  defaultValue?: DynamicValue
  type: FieldType;
  selectedOptions?: SelectOption[];
}

export type NodeOption = {
  id: string;
  name: string;
  icon?: ReactNode | JSX.Element | ComponentType;
  form: OptionForm[]
}

export type NodeDataBase = {
  name: string;
  optionsToConfig?: NodeOption[]
  values?: NodeOption[]
  onEditName: (nodeId: string, newName: string) => void;
  onOptionClick: (nodeId: string, nodeOption: NodeOption) => void;
}

