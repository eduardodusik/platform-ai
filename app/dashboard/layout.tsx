import DashboardTabs from "@/components/dashboard/tabs";

export default async function DashboardLayout({children}: {children: React.ReactNode}) {

  return (
    <section className="z-10 w-full text-white">
        <div className="border-b border-neutral-500 px-8 w-full transition-all">
          <DashboardTabs />
        </div>
        <div className="px-8 py-16">
          {children}
        </div>
    </section>
  )
}

