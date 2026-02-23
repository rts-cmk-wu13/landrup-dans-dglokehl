"use server"

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { SignupSchema } from "./schemas";

export async function authLogin(formData: FormData) {
    console.log("authLogin called")

    const res = await fetch("http://localhost:4000/auth/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: formData.get("username"),
            password: formData.get("password"),
        })
    });
    if (!res.ok) return
    // console.log("res:", res)
    const data = await res.json();
    console.log("data:", data)

    const cookieStore = await cookies()
    cookieStore.set("LD_TOKEN", data.token, { maxAge: data.validUntil })
}


export async function authSignup(formData: FormData) {
    console.log("authSignup called")

    if (formData.get("passwordConfirm") !== formData.get("password")) return

    const result = SignupSchema.safeParse({
        username: formData.get("username"),
        password: formData.get("password"),
        firstname: formData.get("firstname"),
        lastname: formData.get("lastname"),
        age: Number(formData.get("age")),
    })
    if (!result.success) {
        console.log("result.error:", result.error)
        return
    } else {
        console.log("result.data:", result.data)
    }

    const res = await fetch("http://localhost:4000/api/v1/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `username=${result.data.username}&password=${result.data.password}&firstname=${result.data.firstname}&lastname=${result.data.lastname}&age=${result.data.age}&role=default`,
    });
    if (!res.ok) return
    // console.log("res:", res)
    const data = await res.json();
    console.log("data:", data)

    redirect("/login")
}