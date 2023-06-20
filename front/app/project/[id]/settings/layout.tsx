import { ReactNode } from "react";
import Link from "next/link";


function Nav () {
 return (
   <div
     className="px-10 absolute py-6 top-0 z-20 pl-3 pr-3 flex h-12 w-full items-center justify-between border-b border-neutral-700 bg-black">
     <div>
     </div>
     <div className="text-sm text-white/70">
        settings
     </div>
     <div className="flex gap-5">
     </div>
   </div>
 )
}

export default function Layout ({children}: {children: ReactNode}) {
  return (
    <div className="w-full h-full">
      <Nav />
      <div className="">
        <SettingsMenu />
        {children}
      </div>
    </div>
  )
}



export function SettingsMenu () {
  return (
    <div className="bg-black h-full fixed w-[260px] border-r border-neutral-700">
      <div className="pl-16 pt-28">
        <div className="pl-2 flex flex-col w-full pr-2 gap-1 items-start justify-start">
          <Tab>
            Api key
          </Tab>
        </div>
      </div>
    </div>
  )
}

type TabProps ={
  children: ReactNode
  active?: boolean
  onClick?: () => void
}

const Tab = ({children, onClick}: TabProps) => {
  return (
    <Link href="api-key" className="hover:bg-neutral-900 w-full px-4 py-2 rounded cursor-pointer uppercase text-sm">
      {children}
    </Link>
  )
}