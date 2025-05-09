
import React from 'react'
import { signOut } from '@/lib/authClient'
import { useRouter } from 'next/navigation';

function SignOutButton({ className }: { className?: string }) {
    const router = useRouter();

    async function handleClick() {
        await signOut().then(() => {
            router.push("/signin");
        });
    }
  return (
    <div className={className}>
        <button onClick={handleClick}>Sign Out</button>
    </div>
   
  )
}

export default SignOutButton

