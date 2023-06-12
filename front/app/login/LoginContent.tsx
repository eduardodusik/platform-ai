"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Session } from "next-auth";

export default function LoginContent({ session }: { session: Session | null }) {
  const navigate = useRouter();

  useEffect(() => {
    console.log(session)
    if (session) {
      navigate.push("/dashboard");
    }
  }, [navigate, session]);

  return (
    <div className="w-full h-screen bg-neutral-900 flex gap-8 items-center justify-center text-white">
      <div className="mx-auto w-full max-w-[450px]">
        <h1 className="mt-8 mb-1.5 text-xl tracking-[-0.16px] text-slate-12 font-bold">
          Login to retorno
        </h1>

        <button onClick={() => {
          signIn("google");
        }}
                className="mt-5 flex gap-2 border-neutral-700 font-semibold text-sm border p-2 w-full items-center justify-center rounded">
          Login with Google
        </button>
      </div>
    </div>
  );
}