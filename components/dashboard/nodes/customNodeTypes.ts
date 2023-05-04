import {ComponentType, ReactNode} from "react";


export type SelectOption = {
  key: string;
  value: string | string[] | number | boolean;
  placeholder?: string
}

export type OptionForm = {
  name: string;
  value: string | string[] | number | boolean;
  type: 'text' | 'number' | 'boolean' | 'select' | 'multi-select';
  selectOptions?: SelectOption[];
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
  onOptionClick: (nodeId: string, optionId: string) => void;
}

