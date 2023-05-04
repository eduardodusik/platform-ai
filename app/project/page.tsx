"use client";
import ReactFlowInstance from "@/components/project/ReactFlowInstance";


// @ts-ignore
// const getDynamicIcon = (iconName: string) => dynamic(() => import("react-icons/all").then(module => module[iconName]), {ssr: false})


export default function ProjectPage() {
  return (
    <div style={{width: '100vw', height: '100vh'}}>
      <div className="z-10 fixed h-10 w-full bg-black top-0 flex items-center justify-between">
        <div/>
        <div className="text-white/70 text-sm">
          Drafts / new model
        </div>
        <div/>
      </div>
      <ReactFlowInstance />
    </div>
  )
}


