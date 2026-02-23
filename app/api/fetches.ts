import { getToken, getUserId } from "@/utils/cookies"

export async function fetchDefault(url: string) {
    try {
        const res = await fetch(url, { next: { revalidate: 3600 } })
        if (!res.ok) throw new Error(res.statusText)
        return res.json()
    }
    catch(error) {
        console.error(`Failed to fetch - ${error}`)
    }
}

export async function fetchCurrentUser() {
    const token = await getToken()
    const userId = await getUserId()

    const res = await fetch(`http://localhost:4000/api/v1/users/${userId}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        },
    });
    if (!res.ok) return
    return res.json();
}