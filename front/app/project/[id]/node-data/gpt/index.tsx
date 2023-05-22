import {
  NodeDataBase,
  NodeOption,
} from "@/components/project/nodes/customNodeTypes";
import { NODE_IDS_ENUM } from "@/app/project/[id]/node-data/NodeTypes";

const GPT_AVAILABLE_CONFIG: NodeOption[] = [
  {
    id: "setting",
    name: "Settings",
    values: [
      {
        name: "max-tokens",
        label: "Max tokens",
        type: "number",
        value: undefined,
        defaultValue: 500,
      },
    ],
  },
  {
    id: "agents",
    name: "Agents",
    values: [
      {
        name: "agent-type",
        label: "Agent type",
        value: undefined,
        defaultValue: undefined,
        type: "select",
        selectOptions: [
          {
            key: "",
            value: undefined,
          },
          {
            key: "zero-shot-react-description",
            value: "zero-shot-react-description",
          },
          {
            key: "react-docstore",
            value: "react-docstore",
          },
          {
            key: "self-ask-with-search",
            value: "self-ask-with-search",
          },
          {
            key: "conversational-react-description",
            value: "conversational-react-description",
          },
        ],
      },
      {
        name: "tools",
        label: "Tools",
        value: null,
        defaultValue: null,
        type: "select",
        selectOptions: [
          {
            key: "",
            value: undefined,
          },
          {
            key: "serpapi",
            value: "serpapi",
          },
          {
            key: "llm-math",
            value: "llm-math",
          },
        ],
      },
    ],
  },
  {
    id: "set-env",
    name: "Set env",
    values: [
      {
        name: "env",
        placeholder: "Enter env",
        label: "Env",
        value: null,
        defaultValue: null,
        type: "set-env",
      },
    ],
  },
];

export const GPT_CONFIG: NodeDataBase = {
  id: NODE_IDS_ENUM.GPT,
  name: "GPT",
  availableConfig: GPT_AVAILABLE_CONFIG,
  categories: [
    {
      id: "model",
      name: "Model",
      values: [
        {
          name: "Model",
          value: "GPT-3.5-turbo",
          label: "Model",
          type: "select",
          defaultValue: "GPT-3.5-turbo",
          selectOptions: [
            { key: "GPT-3.5-turbo", value: "GPT-3.5-turbo" },
            { key: "text-davinci-003", value: "text-davinci-003" },
            { key: "code-davinci-002", value: "code-davinci-002" },
            { key: "text-embedding-ada-002", value: "text-embedding-ada-002" },
          ],
        },
        {
          name: "Temperature",
          label: "Temperature",
          value: 0,
          type: "number",
          defaultValue: 0.7,
        },
      ],
    },
    {
      id: "template-config",
      name: "Prompt",
      values: [
        {
          name: "system",
          label: "System",
          placeholder:
            "You are a good software engineer specialized in {language}.",
          value: null,
          defaultValue: null,
          type: "textarea",
        },
        {
          name: "Prompt",
          label: "Prompt",
          placeholder: "What's wrong in this code? \n {code}",
          value: null,
          type: "textarea",
          defaultValue: null,
        },
      ],
    },
  ],
};
