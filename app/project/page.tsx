"use client";
import ReactFlowInstance from "@/components/project/ReactFlowInstance";
import Drawer from "@/components/project/Drawer";
import {useCallback, useState} from "react";
import {NodeOption} from "@/components/dashboard/nodes/customNodeTypes";
import {useDebounce} from "use-debounce";


// @ts-ignore
// const getDynamicIcon = (iconName: string) => dynamic(() => import("react-icons/all").then(module => module[iconName]), {ssr: false})



export default function ProjectPage() {


  return (
    <div style={{width: '100vw', height: '100vh'}}>
      <div className="z-20 fixed h-10 w-full bg-black top-0 flex items-center justify-between border-b border-neutral-700">
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


