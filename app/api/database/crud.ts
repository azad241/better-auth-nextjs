import { eq } from "drizzle-orm";
import db from "./db";
import { user } from "@/auth-schema";


export async function findUserByEmail(email: string) {
    const result = await db.select().from(user).where(eq(user.email, email)).limit(1)
    if(result.length === 0) return null
    return result
}