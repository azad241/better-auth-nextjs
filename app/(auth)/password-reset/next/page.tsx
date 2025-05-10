"use client"

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation';
import { resetPassword } from '@/lib/authClient';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Frame } from 'lucide-react';


function ResetPassword() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const [message, setMessage] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    useEffect(() => {
        if (!token)
            setMessage("Token not found or invalid")
    }, [token])
    useEffect(() => {
        toast.error(message)
    }, [message])
    async function handleResetPassword() {
        if (!token) {
            setMessage("Token not found or invalid")
        }
        if (newPassword !== confirmPassword) {
            setMessage('Passwords do not match')
        }
        const { error } = await resetPassword({ token: token!, newPassword })
        if (error) {
            setMessage(error.message || 'Something went wrong')
        }
        else {
            setMessage("Password reset successful! You can now sign in.");
            setTimeout(() => router.push("/signin"), 3000);
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
                        <h1 className="mb-1 mt-4 text-xl font-semibold">Reset Password</h1>
                        <p className="text-sm">Enter your new password</p>
                    </div>

                    <div className="mt-6 space-y-6">
                        <div className="space-y-2">
                            <Label
                                htmlFor="password"
                                className="block text-sm">
                                New Password
                            </Label>
                            <Input
                                disabled={!token}
                                type="password"
                                onInput={(e) => setNewPassword(e.currentTarget.value)}
                                required
                                name="password"
                                id="password"
                                placeholder="*********"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label
                                htmlFor="password"
                                className="block text-sm">
                                Confirm Password
                            </Label>
                            <Input
                                disabled={!token}
                                type="password"
                                onInput={(e) => setConfirmPassword(e.currentTarget.value)}
                                required
                                name="password"
                                id="password"
                                placeholder="*********"
                            />
                        </div>

                        <Button
                            onClick={handleResetPassword}
                            disabled={!token}
                            className="w-full">
                            Reset
                        </Button>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-muted-foreground text-sm">You will be reidrect to the signin page</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ResetPassword