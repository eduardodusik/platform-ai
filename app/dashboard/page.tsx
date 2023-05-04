import { RxPlus } from "react-icons/rx";
import cx from "classnames";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="">
      <div className="flex justify-between">
        <div />
        <Link href="/project" className={cx(
          "text-sm px-4 border border-white py-2 rounded-md text-neutral-700 flex items-center gap-1 bg-white",
                "hover:bg-neutral-900 hover:text-white transition-colors"
          )}>
          New Model
          <RxPlus alignmentBaseline="middle" />
        </Link>
      </div>

      <div className="pt-8 grid grid-cols-2 gap-4">
        <div className={cx(
          "border border-neutral-500 rounded-md py-2 px-4 cursor-pointer",
              "hover:shadow-2xl transition-shadow hover:border-2 hover:border-white"
        )}>
          <div className="h-10">
          </div>
          Modelo exemplo
        </div>
      </div>
    </div>
  )
}