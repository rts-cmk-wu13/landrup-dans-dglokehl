import { NextResponse, NextRequest } from "next/server";
import { getToken } from "@/utils/cookies";

export async function proxy(request: NextRequest) {
    const token = await getToken()

    if (request.nextUrl.pathname.startsWith("/login") || request.nextUrl.pathname.startsWith("/signup")) {
        if (token) return NextResponse.redirect(new URL("/", request.url))
    }

    if (request.nextUrl.pathname.startsWith("/profile")) {
        if (!token) return NextResponse.redirect(new URL("/login", request.url))
    }
}