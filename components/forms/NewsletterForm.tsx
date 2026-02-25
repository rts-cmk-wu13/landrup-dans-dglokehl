"use client"

import { useActionState } from "react";
import Form from "next/form";
import type { FormState } from "@/app/api/types";
import { registerNewsletter } from "@/app/api/actions";
import Button from "../buttons/Button";

type NewsletterFormProps = {
    className?: string;
}

export default function NewsletterForm({ className }: NewsletterFormProps) {
    const initialState: FormState = {
        message: "",
        errors: {
            fieldErrors: {
                email: []
            }
        },
        inputs: {
            email: "",
        }
    }

    const [state, formAction, pending] = useActionState(registerNewsletter, initialState)
    console.log("state:", state)

    return (
        <>
            <Form 
                action={formAction}
                noValidate
                className={`w-full flex items-center gap-4 ${className ? className : ""}`}
            >
                <input
                    type="email"
                    name="email" id="email"
                    placeholder="Email"
                    defaultValue={state.inputs.email ? state.inputs.email : ""}
                    className="form-input"
                />

                <Button className={`px-3 ${pending && "opacity-50 pointer-events-none"}`}>Tilmeld</Button>
            </Form>

            <p className={`mt-1 text-center ${state.errors.fieldErrors.email[0] ? "text-red-400" : "text-green-400"}`}>{state.message}</p>
        </>
    )
}