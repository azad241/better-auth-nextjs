
import { createAuthClient } from "better-auth/react"
import { adminClient } from "better-auth/client/plugins"
export const {signIn, signUp, signOut, getSession, useSession, forgetPassword, resetPassword} = createAuthClient({
     baseURL: process.env.BETTER_AUTH_URL,
    plugins: [
        adminClient()
    ]
})