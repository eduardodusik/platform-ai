"use client";
import {Handle, NodeProps, Position} from "reactflow";
import cx from "classnames";
import {RxPlus} from "react-icons/rx";
import {AiOutlineTool, BsChatText, SiOpenai} from "react-icons/all";
import dynamic from "next/dynamic";
import {memo, useCallback} from "react";
import {NodeDataBase, NodeOption} from "@/components/dashboard/nodes/customNodeTypes";



export default function NodeGPT(props: NodeProps<NodeDataBase>) {
  const {id: nodeId, dragging, isConnectable, data,  } = props
  const {name,onEditName} = data


  const handleOptionClick = useCallback((option: NodeOption) => {
      data.onOptionClick(nodeId, option)
    }, [data, nodeId])

  return (
    <div className={cx(
      dragging && "cursor-grabbing",
      "bg-neutral-800 p-2 rounded cursor-pointer",
      "border border-neutral-700",
      "hover:shadow-md shadow-blue-50 transition-shadow",
      "min-w-[200px] min-h-[100px]"
    )}>
      <Handle
        isConnectable={isConnectable}
        type="target" position={Position.Left}
        id="target"
        onConnect={(params) => console.log('handle onConnect', params)}
      />
      <div className="flex justify-between items-center gap-2">
        <input
          onChange={(ev) => onEditName(nodeId, ev.target.value)}
          className={cx(
            "text-xs text-neutral-500",
            "bg-transparent border-none outline-none",
            "rounded",
            "hover:bg-neutral-700"
          )}
          value={name}
        />
        <div className="rounded-full hover:bg-neutral-600">
          <RxPlus size={12} alignmentBaseline="middle"/>
        </div>
      </div>
      <div className="flex flex-col mt-2 gap-1 font-light text-xs">
        {data?.categories?.map((value) => (
          <Option
            key={value.id}
            name={value.name}
            nodeId={nodeId}
            id={value.id}
            onClickOption={() => handleOptionClick(value)}
            values={value.values}
          />
        ))}
      </div>
    </div>
  )
}

// TODO: Passar o icone dinamico na hora que montar a arvore de nodes no react-flow

// @ts-ignore


type OptionProps = NodeOption & {
  nodeId: string
  onClickOption: () => void
}

function Option({ name, onClickOption, id, nodeId}: OptionProps) {
  return (
    <div
      onClick={onClickOption}
      className={cx(
        "flex items-center gap-2",
        "rounded px-2 py-1 text-xs bg-neutral-700 min-w-full min-h-full",
        "hover:shadow-md hover:bg-neutral-700/90 transition-colors"
      )}
    >
      <span>{name}</span>
    </div>
  )
}

const props = [
  {}
]