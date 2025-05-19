import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "@/auth-schema";
import db from "@/app/api/database/db";
import { nextCookies } from "better-auth/next-js";
import { sendEmail } from "./authMailer";
import { admin } from "better-auth/plugins"

// const db = './mydb.db'
// npx @better-auth/cli generate --config lib/auth/auth.ts
export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "sqlite",
        schema
    }),
    emailAndPassword: {
        enabled: true,
        sendResetPassword: async ({ user, url }) => {
            await sendEmail({
                to: user.email,
                subject: "Reset your password",
                message: `Click the link to reset your password: ${url}`,
            });
        },
        resetPasswordTokenExpiresIn: 3600,
    },
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
    },



     plugins: [nextCookies(), admin() ]
})

