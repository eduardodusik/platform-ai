import ReactFlowComp from "@/components/project/ReactFlowInstance";

export default function ProjectPage() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div className="fixed top-0 z-20 flex h-10 w-full items-center justify-between border-b border-neutral-700 bg-black">
        <div />
        <div className="text-sm text-white/70">Drafts / new model</div>
        <div />
      </div>
      <ReactFlowComp />
    </div>
  );
}
