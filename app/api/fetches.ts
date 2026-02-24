import { getToken, getUserId } from "@/utils/cookies"
import type { UserProfile } from "./types"

export async function fetchDefault(url: string, revalidate?: number) {
    try {
        const res = await fetch(url, { next: { revalidate: revalidate ? revalidate : 3600 } })
        if (!res.ok) throw new Error(res.statusText)
        return res.json()
    }
    catch(error) {
        console.error(`Failed to fetch - ${error}`)
    }
}

export async function fetchCurrentUser(revalidate?: number) {
    const token = await getToken()
    const userId = await getUserId()

    const res = await fetch(`http://localhost:4000/api/v1/users/${userId}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        next: { revalidate: revalidate ? revalidate : 0 },
    });
    if (!res.ok) return

    const data: UserProfile = await res.json()
    if (!data) return
    return data;
}