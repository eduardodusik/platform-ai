
import { getServerSession } from "next-auth/next";
import LoginContent from "@/app/login/LoginContent";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";



export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  return (
      <LoginContent session={session} />
  )
}