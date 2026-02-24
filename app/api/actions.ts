"use server"

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getToken, getUserId } from "@/utils/cookies";
import { ActivitySchema } from "./schemas";

// --- ADD/REMOVE USER FROM ACTIVITY --- //

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



// --- CREATE/EDIT ACTIVITY --- //

export async function createActivity(formData: FormData) {
    console.log("createActivity called")

    const result = ActivitySchema.safeParse({
        name: formData.get("name"),
        description: formData.get("description"),
        weekday: formData.get("weekday"),
        time: formData.get("time"),
        minAge: Number(formData.get("minAge")),
        maxAge: Number(formData.get("maxAge")),
        instructorId: Number(formData.get("instructorId")),
        maxParticipants: Number(formData.get("maxParticipants")),
        file: formData.get("file"),
    })
    if (!result.success) {
        console.log("result.error:", result.error)
        return
    }
    // console.log("result.data:", result.data)

    const form = new FormData();
    form.append("name", result.data.name)
    form.append("description", result.data.description)
    form.append("weekday", result.data.weekday)
    form.append("time", result.data.time)
    form.append("minAge", String(result.data.minAge))
    form.append("maxAge", String(result.data.maxAge))
    form.append("instructorId", String(result.data.instructorId))
    form.append("maxParticipants", String(result.data.maxParticipants))
    form.append("file", result.data.file)


    const token = await getToken()

    const res = await fetch("http://localhost:4000/api/v1/activities", {
        method: "POST",
        headers: {
            // "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
        },
        body: form
    });
    // console.log("res:", res)
    if (!res.ok) return

    // const data = await res.json();
    // console.log("data:", data)
    redirect("/profile")
}

export async function editActivity(formData: FormData) {
    console.log("editActivity called")

    const result = ActivitySchema.safeParse({
        name: formData.get("name"),
        description: formData.get("description"),
        weekday: formData.get("weekday"),
        time: formData.get("time"),
        minAge: Number(formData.get("minAge")),
        maxAge: Number(formData.get("maxAge")),
        instructorId: Number(formData.get("instructorId")),
        maxParticipants: Number(formData.get("maxParticipants")),
        file: formData.get("file"),
    })
    if (!result.success) {
        console.log("result.error:", result.error)
        return
    }
    // console.log("result.data:", result.data)

    const form = new FormData();
    form.append("name", result.data.name)
    form.append("description", result.data.description)
    form.append("weekday", result.data.weekday)
    form.append("time", result.data.time)
    form.append("minAge", String(result.data.minAge))
    form.append("maxAge", String(result.data.maxAge))
    form.append("instructorId", String(result.data.instructorId))
    form.append("maxParticipants", String(result.data.maxParticipants))
    form.append("file", result.data.file)


    const token = await getToken()

    const res = await fetch(`http://localhost:4000/api/v1/activities/${formData.get("activityId")}`, {
        method: "PATCH",
        headers: {
            // "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
        },
        body: form
    });
    console.log("res:", res)
    if (!res.ok) return

    const data = await res.json();
    console.log("data:", data)
}

export async function deleteActivity(activityId: number) {
    console.log("deleteActivity called")

    const token = await getToken()

    const res = await fetch(`http://localhost:4000/api/v1/activities/${activityId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        },
    });
    if (!res.ok) return

    redirect("/profile")
}