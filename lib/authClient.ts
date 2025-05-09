import { createAuthClient } from "better-auth/react"

export const {signIn, signUp, signOut, getSession, useSession, forgetPassword} = createAuthClient({
    baseURL: "http://localhost:3000"
})
