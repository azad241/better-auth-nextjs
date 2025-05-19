import { betterFetch } from "@better-fetch/fetch";
import type { auth } from "@/lib/auth/auth";
import { NextRequest, NextResponse } from "next/server";
 
type Session = typeof auth.$Infer.Session;
 
export async function middleware(request: NextRequest) {
	const { data: session } = await betterFetch<Session>("/api/auth/get-session", {
		baseURL: request.nextUrl.origin,
		headers: {
			cookie: request.headers.get("cookie") || "", // Forward the cookies from the request
		},
	});
 
	if (!session) {
		return NextResponse.redirect(new URL("/signin", request.url));
	}
 
	if (session && session.user.role !== "admin" && session.user.role !== "sale") {
		return NextResponse.redirect(new URL("/unauthorized", request.url));
	}
 
	return NextResponse.next();
}
 
export const config = {
	matcher: ["/dashboard", ], // Apply middleware to specific routes
};



//cpanel
// import { NextRequest, NextResponse } from "next/server";
// import { getSessionCookie } from "better-auth/cookies";
 
// export async function middleware(request: NextRequest) {
// 	const session = getSessionCookie(request);
// 	if (!session) {
// 		return NextResponse.redirect(new URL("/signin?notsessioned", request.url));
// 	}
 
// 	return NextResponse.next();
// }
// export const config = {
// 	matcher: ["/dashboard"], // Apply middleware to specific routes
// };