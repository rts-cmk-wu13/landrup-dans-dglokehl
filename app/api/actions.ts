"use server"

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as z from "zod";
import { getToken, getUserId } from "@/utils/cookies";
import { ActivitySchema, NewsletterSchema, ContactSchema } from "./schemas";
import type { FormState } from "./types";


// --- NEWSLETTER --- //

export async function registerNewsletter(initialState: FormState, formData: FormData): Promise<FormState> {
    // console.log("registerNewsletter called")

    const formObject = {
        email: formData.get("email"),
    }

    const result = NewsletterSchema.safeParse(formObject)
    if (!result.success) return {
        message: "Indtast en gyldig email",
        errors: z.flattenError(result.error),
        inputs: formObject,
    }
    // console.log("result.data:", result.data)

    const res = await fetch("http://localhost:4000/api/v1/newsletter", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formObject)
    });
    if (!res.ok) return {
        message: `${res.status}: ${res.statusText}`,
        errors: {
            fieldErrors: {}
        },
        inputs: formObject,
    }

    const data = await res.json();
    // console.log("data:", data)

    return {
        message: "Tak for din tilmelding",
        errors: {
            fieldErrors: {
                email: []
            }
        },
        inputs: {
            email: "",
        }
    }
}


// --- NEWSLETTER --- //

export async function sendContactMessage(initialState: FormState, formData: FormData): Promise<FormState> {
    // console.log("sendContactMessage called")

    const formObject = {
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
    }

    const result = ContactSchema.safeParse(formObject)
    if (!result.success) return {
        message: "",
        errors: z.flattenError(result.error),
        inputs: formObject,
    }
    // console.log("result.data:", result.data)

    const res = await fetch("http://localhost:4000/api/v1/messages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formObject)
    });
    if (!res.ok) return {
        message: `${res.status}: ${res.statusText}`,
        errors: {
            fieldErrors: {}
        },
        inputs: formObject,
    }

    const data = await res.json();
    // console.log("data:", data)

    return {
        message: "Tak for din besked",
        errors: {
            fieldErrors: {
                email: []
            }
        },
        inputs: {
            name: "",
            email: "",
            message: "",
        }
    }
}



// --- ADD/REMOVE USER FROM ACTIVITY --- //

export async function addUserToActivity(activityId: number) {
    // console.log("addUserToActivity called")

    const token = await getToken()
    const userId = await getUserId()
    // console.log(token, userId, activityId)

    const res = await fetch(`http://localhost:4000/api/v1/users/${userId}/activities/${activityId}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        },
    });
    if (!res.ok) return

    revalidatePath("/")
}

export async function removeUserFromActivity(activityId: number) {
    // console.log("removeUserFromActivity called")

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

    revalidatePath("/")
}



// --- CREATE/EDIT ACTIVITY --- //

export async function createActivity(initialState: FormState, formData: FormData): Promise<FormState> {
    // console.log("createActivity called")

    const formObject = {
        name: formData.get("name"),
        description: formData.get("description"),
        weekday: formData.get("weekday"),
        time: formData.get("time"),
        minAge: formData.get("minAge") === "" ? "" : Number(formData.get("minAge")),
        maxAge: formData.get("maxAge") === "" ? "" : Number(formData.get("maxAge")),
        instructorId: formData.get("instructorId"),
        maxParticipants: formData.get("maxParticipants") === "" ? "" : Number(formData.get("maxParticipants")),
        file: formData.get("file"),
    }

    const result = ActivitySchema.safeParse(formObject)
    if (!result.success) return {
        errors: z.flattenError(result.error),
        inputs: formObject,
    }
    // console.log("result.data:", result.data)

    const form = new FormData();
    form.append("name", result.data.name)
    form.append("description", result.data.description)
    form.append("weekday", result.data.weekday)
    form.append("time", result.data.time)
    form.append("minAge", String(result.data.minAge))
    form.append("maxAge", String(result.data.maxAge))
    form.append("instructorId", result.data.instructorId)
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
    if (!res.ok) return {
        message: `${res.status}: ${res.statusText}`,
        errors: {
            fieldErrors: {}
        },
        inputs: formObject,
    }

    redirect("/profile")
}

export async function editActivity(initialState: FormState, formData: FormData): Promise<FormState> {
    // console.log("editActivity called")

    const formObject = {
        name: formData.get("name"),
        description: formData.get("description"),
        weekday: formData.get("weekday"),
        time: formData.get("time"),
        minAge: formData.get("minAge") === "" ? "" : Number(formData.get("minAge")),
        maxAge: formData.get("maxAge") === "" ? "" : Number(formData.get("maxAge")),
        instructorId: formData.get("instructorId"),
        maxParticipants: formData.get("maxParticipants") === "" ? "" : Number(formData.get("maxParticipants")),
        file: formData.get("file"),
    }

    const result = ActivitySchema.safeParse(formObject)
    if (!result.success) return {
        errors: z.flattenError(result.error),
        inputs: formObject,
    }
    // console.log("result.data:", result.data)

    const form = new FormData();
    form.append("name", result.data.name)
    form.append("description", result.data.description)
    form.append("weekday", result.data.weekday)
    form.append("time", result.data.time)
    form.append("minAge", String(result.data.minAge))
    form.append("maxAge", String(result.data.maxAge))
    form.append("instructorId", result.data.instructorId)
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
    if (!res.ok) return {
        message: `${res.status}: ${res.statusText}`,
        errors: {
            fieldErrors: {}
        },
        inputs: formObject,
    }

    redirect("/profile")
}

export async function deleteActivity(activityId: number, initialState: FormState): Promise<FormState> {
    // console.log("deleteActivity called")

    const token = await getToken()

    const res = await fetch(`http://localhost:4000/api/v1/activities/${activityId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        },
    });
    if (!res.ok) return { message: `${res.status}: ${res.statusText}` }

    redirect("/profile")
}