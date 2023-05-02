import Link from "next/link";

export default async function Home() {
    return (
    <div className="z-10 w-full max-w-xl px-5 xl:px-0 text-white">
      <Link href="/dashboard">
        Go to dashboard
      </Link>
    </div>
  );
}
