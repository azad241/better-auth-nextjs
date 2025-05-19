"use client"
import Link from 'next/link'
import { Frame } from 'lucide-react'
import { toast } from 'sonner'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { forgetPassword } from '@/lib/auth/authClient'


export default function PasswordResetComponent() {
    const [email, setEmail] = useState('')
    const [sent, setSent] = useState(0)
    const [loading, setLoading] = useState(false)

    async function handleReset() {
        setLoading(true)
        const isFound = await fetch(`/api/auth/get-user?email=${email}`)
        if(!isFound.ok){
            toast.error('Email not found')
            setLoading(false)
            return
        }
        const data : {email: string, name: string} = await isFound.json()
        // console.log('data: ', data)
        if(data.email.length){
            setSent(+1)
            const {error} = await forgetPassword({email: data.email, redirectTo: `${window.location.origin}/password-reset/next`})
            if(error){
                toast.error('Something went wrong')
                setLoading(false)
                return
            }
            else{
                toast.success('Email sent, Please check your inbox')
                setLoading(false)
                return
            }
        }
        else{
            toast.error('Email not found')
            setLoading(false)
            return
        }
    }

    return (
        <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
            <div
                // action=""
                className="bg-muted m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]">
                <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-8 pb-6">
                    <div className="text-center">
                        <Link
                            href="/"
                            aria-label="go home"
                            className="mx-auto block w-fit">
                            <Frame />
                        </Link>
                        <h1 className="mb-1 mt-4 text-xl font-semibold">Recover Password</h1>
                        <p className="text-sm">Enter your email to receive a reset link</p>
                    </div>

                    <div className="mt-6 space-y-6">
                        <div className="space-y-2">
                            <Label
                                htmlFor="email"
                                className="block text-sm">
                                Email
                            </Label>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                name="email"
                                id="email"
                                placeholder="name@example.com"
                            />
                        </div>

                        <Button
                            onClick={handleReset}
                            disabled={sent > 2 || loading}
                            className="w-full">
                            {loading ? 'Loading...' : sent > 2 ? 'Limit reached, try again later' : sent > 0 ? 'Send Reset Link Again' : 'Send Reset Link'}
                        </Button>
                    </div>

                      <div className="mt-6 text-center">
                        <p className="text-muted-foreground text-sm">We&apos;ll send you a link to reset your password.</p>
                    </div>
                </div>

                <div className="p-3">
                    <p className="text-accent-foreground text-center text-sm">
                        Remembered your password?
                        <Button
                            asChild
                            variant="link"
                            className="px-2">
                            <Link href="/signin">Sign in</Link>
                        </Button>
                    </p>
                </div>
            </div>
        </section>
    )
}

