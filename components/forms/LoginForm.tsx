"use client"

import { useActionState } from "react";
import Form from "next/form";
import { authLogin } from "@/app/api/auth";
import type { FormState } from "@/app/api/types";
import InputWrapper from "./InputWrapper";
import Button from "../buttons/Button";

type LoginFormProps = {
    className?: string;
}

export default function LoginForm({ className }: LoginFormProps) {
    const initialState: FormState = {
        message: "",
        errors: {
            fieldErrors: {}
        },
        inputs: {
            username: "",
            password: "",
        }
    }

    const [state, formAction, pending] = useActionState(authLogin, initialState)
    console.log("state:", state)

    return (
        <Form
            action={formAction}
            noValidate
            className={`flex flex-col items-center gap-5 ${className ? className : ""}`}
        >
            <InputWrapper error={state.errors.fieldErrors.username ? state.errors.fieldErrors.username[0] : ""}>
                <input
                    type="text"
                    name="username" id="username"
                    placeholder="Brugernavn"
                    defaultValue={state.inputs.username ? state.inputs.username : ""}
                    className="form-input"
                />
            </InputWrapper>
            <InputWrapper error={state.errors.fieldErrors.password ? state.errors.fieldErrors.password[0] : ""}>
                <input
                    type="password"
                    name="password" id="password"
                    placeholder="Adgangskode"
                    defaultValue={state.inputs.password ? state.inputs.password : ""}
                    className="form-input"
                />
            </InputWrapper>
            <p className="mt-1 text-red-400">{state.message}</p>

            <Button className={`px-22 ${pending && "opacity-50 pointer-events-none"}`}>Log ind</Button>
        </Form>
    )
}