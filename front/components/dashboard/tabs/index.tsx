"use client";

import * as Tabs from '@radix-ui/react-tabs';
import React from "react";
import cx from "classnames";
import Link from "next/link";
import {useSelectedLayoutSegment} from "next/navigation";

const menuList = [
  {label: 'Overview', href: '/dashboard', target: null},
  {label: 'test', href: '/dashboard/test', target: 'test'},
]
export default function DashboardTabs() {
  const activeSegment = useSelectedLayoutSegment()
  console.log(activeSegment)
return (
  <div className="-mb-px flex gap-8">
    {menuList.map(({href, label, target}) => (
      <Link key={target} href={href}>
        <div className={cx(
          "py-4",
          activeSegment === target ? 'border-b border-amber-700 transition-all' : "hover:border-b hover:border-white transition-all",
        )}>
          {label}
        </div>
      </Link>
    ))}
  </div>
)};