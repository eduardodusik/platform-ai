"use client";
import { Handle, NodeProps, Position } from "reactflow";
import { RxHome } from "react-icons/rx";

export default function NodeStart(props: NodeProps) {
  return (
    <div className="flex items-center gap-2 rounded-full border-amber-700 bg-amber-600 px-3 py-1 text-xs">
      <RxHome />
      <p>Start</p>
      <div className="h-1 w-1">
        <Handle
          type="source"
          isConnectable={props.isConnectable}
          position={Position.Right}
          id="y"
          onConnect={(params) => console.log("handle onConnect", params)}
          className="mr-4 bg-green-800"
        />
      </div>
    </div>
  );
}
