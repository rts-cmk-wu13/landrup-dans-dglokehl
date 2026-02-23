import { cookies } from "next/headers";

export async function getToken() {
    const cookieStore = await cookies()
    if (!cookieStore.has("LD_TOKEN")) return

    const token = cookieStore.get("LD_TOKEN")
    if (!token) return

    return token.value
}

export async function getUserId() {
    const cookieStore = await cookies()
    if (!cookieStore.has("LD_USER_ID")) return

    const userId = cookieStore.get("LD_USER_ID")
    if (!userId) return

    return userId.value
}