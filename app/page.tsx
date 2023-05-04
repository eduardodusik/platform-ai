import Link from "next/link";

export default async function Home() {
    return (
    <div className="w-full h-full">
      <Link href="/dashboard">
        Go to dashboard
      </Link>
    </div>
  );
}
