export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-full w-full text-white">{children}</div>;
}
