import WorkflowInstance from "@/components/project/ReactFlowInstance";
import {
  NodeDataBase,
  NodeOption,
} from "@/components/dashboard/nodes/customNodeTypes";
import { Node } from "reactflow";

export default function ProjectPage() {
  const availableConfig: NodeOption[] = [
    {
      name: "Settings",
      id: "settings-config",
      values: [
        {
          name: "max-tokens",
          type: "textarea",
          defaultValue: 50,
          value: "Texto",
        },
        {
          name: "model-type",
          type: "select",
          defaultValue: 50,
          value: "Texto",
          selectOptions: [
            { key: "1", value: "1" },
            { key: "2", value: "12" },
          ],
        },
      ],
    },
  ];
  const nodes: Node<NodeDataBase>[] = [
    {
      id: "4",
      type: "gpt",
      position: { x: 200, y: 250 },
      data: {
        name: "Hello World LLM",
        availableConfig: availableConfig,
        categories: [
          {
            id: "open-ai",
            name: "Model",
            values: [
              {
                name: "Model",
                value: "GPT-3.5-turbo",
                type: "select",
                selectOptions: [
                  { key: "GPT-4", value: "GPT-4" },
                  { key: "GPT-3.5", value: "GPT-3.5" },
                  { key: "GPT-3.5-turbo", value: "GPT-3.5-turbo" },
                  {
                    key: "text-davinci-edit-001",
                    value: "text-davinci-edit-001",
                  },
                  { key: "ada", value: "ada" },
                ],
              },
            ],
          },
          {
            id: "template",
            name: "Template",
            values: [
              {
                name: "Template",
                value: "OpenAI",
                type: "textarea",
              },
              {
                name: "Variaveis",
                value: "OpenAI",
                type: "text",
              },
            ],
          },
        ],
      },
    },
  ];

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div className="fixed top-0 z-20 flex h-10 w-full items-center justify-between border-b border-neutral-700 bg-black">
        <div />
        <div className="text-sm text-white/70">Drafts / new model</div>
        <div />
      </div>
      <WorkflowInstance nodeData={nodes} />
    </div>
  );
}
