import { cookies } from "next/headers";

export async function getToken() {
    const cookieStore = await cookies()
    if (!cookieStore.has("LD_TOKEN")) return

    const token = cookieStore.get("LD_TOKEN")
    if (!token) return

    return token.value
}