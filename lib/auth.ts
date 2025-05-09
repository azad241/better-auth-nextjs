import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "@/auth-schema";
import db from "@/app/api/database/db"; 
import { nextCookies } from "better-auth/next-js";

// const db = './mydb.db'
export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "sqlite",
        schema
    }),
    emailAndPassword: {  
        enabled: true
    },
    socialProviders: { 
        github: { 
           clientId: process.env.GITHUB_CLIENT_ID as string, 
           clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
        }, 
    }, 
    plugins: [nextCookies()]
})

