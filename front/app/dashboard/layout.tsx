import DashboardTabs from "@/components/dashboard/tabs";
import {Suspense} from "react";
import Nav from "@/components/layout/nav";

export default async function DashboardLayout({children}: { children: React.ReactNode }) {

  return (
    <div className="fixed h-screen w-full bg-neutral-900">
      <Suspense fallback="...">
        {/* @ts-expect-error Server Component */}
        <Nav/>
      </Suspense>
      <main className="flex min-h-screen w-full">
        <section className="z-10 w-full text-white">
          <div className="border-b border-neutral-500 px-8 w-full transition-all">
            <DashboardTabs/>
          </div>
          <div className="px-8 py-16">
            {children}
          </div>
        </section>
      </main>
    </div>
  )
}

