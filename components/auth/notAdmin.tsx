"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldAlert, ArrowLeft, Mail, Phone } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import SignOutButton from "./signOut"
import { useSession } from "@/lib/auth/authClient"
import { redirect } from "next/navigation"
export default function AdminRequired() {
const session = useSession()

if(!session){
    return redirect('/signin')
}

if(session && session.data?.user.role === 'admin'){
  return redirect('/admin/dashboard')
}
if(session && session.data?.user.role === 'sale'){
  return redirect('/admin/sales')
}

  return (
    <div className="flex items-center justify-center min-h-[70vh] p-4">
        <Card className="border-2 border-amber-200 shadow-lg">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-4 bg-amber-100 p-3 rounded-full">
              <ShieldAlert className="h-10 w-10 text-amber-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-amber-700">Admin Access Required</CardTitle>
            <CardDescription className="text-amber-600">You don&apos;t have permission to access this area</CardDescription>
            <CardDescription className="text-amber-600">You&apos;re {session.data?.user.name} ({session.data?.user.role})</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex justify-center mb-6">
              <Image src="/logo.png" alt="Playground Logo" width={180} height={90} className="opacity-90" />
            </div>

            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
              <p className="text-sm text-center mb-3">
                Please contact admin to request admin privileges for your account.
              </p>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-amber-600" />
                  <span>admin@admin.com</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-amber-600" />
                  <span>...</span>
                </div>
              </div>
            </div>

            <div className="text-center text-sm text-muted-foreground mt-2">
              <p>Please include your name, email, and role in your request.</p>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-2">
            <Button asChild variant="destructive" className="w-full">
              <SignOutButton />
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/signin">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Signin as Admin
              </Link>
            </Button>
          </CardFooter>
        </Card>
    </div>
  )
}
