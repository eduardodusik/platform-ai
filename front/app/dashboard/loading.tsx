

export default function loading () {
  return (
    <div className="flex flex-col">
      <div className="flex justify-end">
        <div className="rounded w-[120px] h-[40px] bg-neutral-800 animate-pulse" />
      </div>
    <div className="pt-8 grid grid-cols-2 gap-4 ">
      <div className="w-full h-[100px] rounded bg-neutral-800 animate-pulse" />
      <div className="w-full h-[100px] rounded bg-neutral-800 animate-pulse" />
      <div className="w-full h-[100px] rounded bg-neutral-800 animate-pulse" />
      <div className="w-full h-[100px] rounded bg-neutral-800 animate-pulse" />
      <div className="w-full h-[100px] rounded bg-neutral-800 animate-pulse" />
    </div>
    </div>
  )
}