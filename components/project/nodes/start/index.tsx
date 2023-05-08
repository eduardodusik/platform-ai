"use client";
import {Handle, NodeProps, Position} from "reactflow";
import {RxHome} from 'react-icons/rx'

export default function NodeStart(props: NodeProps) {

  return (
    <div className="rounded-full bg-amber-600 border-amber-700 px-3 py-1 text-xs gap-2 flex items-center">
      <RxHome/>
      <p>Start</p>
      <div className="w-1 h-1">
        <Handle
          type="source"
          isConnectable={props.isConnectable}
          position={Position.Right}
          id="y"
          onConnect={(params) => console.log('handle onConnect', params)} className="mr-4 bg-green-800"/>
      </div>
    </div>
  )
}