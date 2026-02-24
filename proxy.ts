import { NextResponse, NextRequest } from "next/server";
import { getToken } from "@/utils/cookies";
import { fetchCurrentUser } from "./app/api/fetches";

export async function proxy(request: NextRequest) {
    const token = await getToken()

    if (request.nextUrl.pathname.startsWith("/login") || request.nextUrl.pathname.startsWith("/signup")) {
        if (token) return NextResponse.redirect(new URL("/", request.url))
    }

    if (request.nextUrl.pathname.startsWith("/profile")) {
        if (!token) return NextResponse.redirect(new URL("/login", request.url))
    }

    if (
        request.nextUrl.pathname.startsWith("/activities/new") ||
        (request.nextUrl.pathname.startsWith("/activities/") && request.nextUrl.pathname.endsWith("/edit")) ||
        (request.nextUrl.pathname.startsWith("/activities/") && request.nextUrl.pathname.endsWith("/delete"))
    ) {
        const user = await fetchCurrentUser()
        if (!user) return
        if (user.role !== "instructor") return NextResponse.redirect(new URL("/", request.url))
    }
}