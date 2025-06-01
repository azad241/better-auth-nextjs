"use server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import AdminRequired from '@/components/auth/notAdmin'
async function Unauthorized() {

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return redirect('/signin')
  }
  return (
    <AdminRequired />
  )
}

export default Unauthorized