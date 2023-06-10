import {
  NodeDataBase,
  NodeOption,
} from "@/components/project/nodes/customNodeTypes";
import { NODE_IDS_ENUM } from "@/app/project/[id]/node-data/NodeTypes";

const WHISPER_AVAILABLE_CONFIG: NodeOption[] = [
  {
    id: "prompt",
    name: "Prompt",
    values: [
      {
        name: "prompt",
        label: "Prompt",
        type: "textarea",
        placeholder: "My name is Eduardo and I'm a software engineer, this audio is about AI",
        value: undefined,
        defaultValue: 500,
      },
    ],
  },
];

export const WHISPER_CONFIG: NodeDataBase = {
  id: NODE_IDS_ENUM.WHISPER,
  name: "Whisper",
  availableConfig: WHISPER_AVAILABLE_CONFIG,
  categories: [
    {
      id: "type",
      name: "Type",
      values: [
        {
          name: "type",
          value: "transcriptions",
          label: "Type",
          type: "select",
          defaultValue: "transcriptions",
          selectOptions: [
            { key: "transcriptions", value: "transcriptions" },
            { key: "translations", value: "translations" },
          ],
        },
      ],
    },
  ],
};
