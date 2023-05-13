import ElementsMenu from "@/components/project/ElementsMenu";
import { useRFState } from "../../../store/FlowStore";

export default function Menu() {
  const { nodes, variables } = useRFState((state) => ({
    nodes: state.nodes,
    variables: state.variables,
  }));

  return (
    <div className="fixed left-0 top-10 flex h-full items-center gap-3">
      <div className="h-full w-52 border-r border-neutral-700 bg-neutral-900">
        <div className="p-3">
          <section className="pt-4">
            <div className="font-bold">Variables</div>
            <div className="flex flex-col pt-2">
              {variables?.map((val) => (
                <div key={val.key}>{val.key}</div>
              ))}
            </div>
          </section>

          <section className="pt-4">
            <div className="font-bold">Nodes</div>
            <div className="flex flex-col gap-1 pt-2">
              {nodes?.map((node) => (
                <div key={node.id}>{node.data.name}</div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <ElementsMenu />
    </div>
  );
}
