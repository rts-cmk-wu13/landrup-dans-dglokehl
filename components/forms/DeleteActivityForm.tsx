"use client"

import { useActionState } from "react";
import Form from "next/form";
import type { Activity, FormState } from "@/app/api/types";
import { deleteActivity } from "@/app/api/actions";
import Button from "../buttons/Button";

type DeleteActivityFormProps = {
    activity: Activity;
    className?: string;
}

export default function DeleteActivityForm({ activity, className }: DeleteActivityFormProps) {
    const deleteActivityWithId = deleteActivity.bind(null, activity.id)

    const initialState: FormState = {
        message: ""
    }

    const [state, formAction, pending] = useActionState(deleteActivityWithId, initialState)
    console.log("state:", state)

    return (
        <Form
            action={formAction}
            className={`flex flex-col items-center gap-6 text-center ${className ? className : ""}`}
        >
            <div className="space-y-3">
                <p className="text-lg">Er du sikker på at du vil slette dette hold?</p>
                <p className="text-2xl font-bold">{activity.name}</p>
            </div>
            <Button className={`px-18 bg-red-700! text-app-white! ${pending && "opacity-50 pointer-events-none"}`}>Slet hold</Button>
        </Form>
    )
}