import cx from "classnames";
import Link from "next/link";
import { getProjects } from "@/app/api/auth/project/create-nodes";
import NewProject from "@/components/dashboard/NewProject";

export default async function Dashboard() {
  const projects = await getProjects();

  return (
    <div className="">
      <div className="flex justify-between">
        <div />
        <NewProject />
      </div>

      <div className="pt-8 grid grid-cols-2 gap-4">
        {projects?.map((project) => (
          <Link key={project.id} href={`/project/${project.id}`}>
            <div className={cx(
              "border border-neutral-500 rounded-md py-2 px-4 cursor-pointer",
              "hover:shadow-2xl transition-shadow hover:border-2 hover:border-white",
            )}>
              <div className="h-10">
              </div>
              {project.name}
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}