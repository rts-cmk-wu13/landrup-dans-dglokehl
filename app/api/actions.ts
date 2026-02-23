"use server"

import { getToken, getUserId } from "@/utils/cookies";
import { revalidatePath } from "next/cache";

export async function addUserToActivity(activityId: number) {
    console.log("addUserToActivity called")

    const token = await getToken()
    const userId = await getUserId()
    console.log(token, userId, activityId)

    const res = await fetch(`http://localhost:4000/api/v1/users/${userId}/activities/${activityId}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        },
    });
    if (!res.ok) return
    console.log("res:", res)

    // const data = await res.json();
    // console.log("data:", data)
    revalidatePath("/")
}

export async function removeUserFromActivity(activityId: number) {
    console.log("removeUserFromActivity called")

    const token = await getToken()
    const userId = await getUserId()

    const res = await fetch(`http://localhost:4000/api/v1/users/${userId}/activities/${activityId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });
    if (!res.ok) return

    // const data = await res.json();
    // console.log("data:", data)
    revalidatePath("/")
}