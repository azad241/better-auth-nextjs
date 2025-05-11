
import React, { useState } from 'react'
import { signOut } from '@/lib/auth/authClient'
import { useRouter } from 'next/navigation';

function SignOutButton({ className }: { className?: string }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false)

    async function handleClick() {
        setLoading(true)
        await signOut({
          fetchOptions: {
            onSuccess: () => router.push("/signin"),
          }
        }).then(() => {
            setLoading(false)
        })
    }
  return (
    <div className={className}>
        <button disabled={loading} onClick={handleClick}>{loading ? 'Signing out...' : 'Sign out'}</button>
    </div>
   
  )
}

export default SignOutButton

