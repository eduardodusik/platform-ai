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
          type: "number",
          defaultValue: 50,
          value: 0,
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
                name: "llm",
                value: "OpenAI",
                type: "text",
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
                type: "text",
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
