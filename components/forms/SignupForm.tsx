"use client"

import { useActionState } from "react";
import Form from "next/form";
import { authSignup } from "@/app/api/auth";
import type { FormState } from "@/app/api/types";
import InputWrapper from "./InputWrapper";
import Button from "../buttons/Button";

type SignupFormProps = {
    className?: string;
}

export default function SignupForm({ className }: SignupFormProps) {
    const initialState: FormState = {
        message: "",
        errors: {
            fieldErrors: {}
        },
        inputs: {
            firstname: "",
            lastname: "",
            username: "",
            age: "",
            password: "",
            passwordConfirm: "",
        }
    }

    const [state, formAction, pending] = useActionState(authSignup, initialState)
    console.log("state:", state)

    return (
        <Form
            action={formAction}
            noValidate
            className={`flex flex-col items-center gap-5 ${className ? className : ""}`}
        >
            <InputWrapper error={state.errors.fieldErrors.firstname ? state.errors.fieldErrors.firstname[0] : ""}>
                <input
                    type="text"
                    name="firstname" id="firstname"
                    placeholder="Fornavn"
                    defaultValue={state.inputs.firstname ? state.inputs.firstname : ""}
                    className="form-input"
                />
            </InputWrapper>
            <InputWrapper error={state.errors.fieldErrors.lastname ? state.errors.fieldErrors.lastname[0] : ""}>
                <input
                    type="text"
                    name="lastname" id="lastname"
                    placeholder="Efternavn"
                    defaultValue={state.inputs.lastname ? state.inputs.lastname : ""}
                    className="form-input"
                />
            </InputWrapper>
            <InputWrapper error={state.errors.fieldErrors.username ? state.errors.fieldErrors.username[0] : ""}>
                <input
                    type="text"
                    name="username" id="username"
                    placeholder="Brugernavn"
                    defaultValue={state.inputs.username ? state.inputs.username : ""}
                    className="form-input"
                />
            </InputWrapper>
            <InputWrapper error={state.errors.fieldErrors.age ? state.errors.fieldErrors.age[0] : ""}>
                <input
                    type="number"
                    name="age" id="age"
                    placeholder="Alder"
                    defaultValue={state.inputs.age ? state.inputs.age : ""}
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
            <InputWrapper error={state.errors.fieldErrors.passwordConfirm ? state.errors.fieldErrors.passwordConfirm[0] : ""}>
                <input
                    type="password"
                    name="passwordConfirm" id="passwordConfirm"
                    placeholder="Gentag adgangskode"
                    defaultValue={state.inputs.passwordConfirm ? state.inputs.passwordConfirm : ""}
                    className="form-input"
                />
            </InputWrapper>

            <Button className={`px-22 ${pending && "opacity-50 pointer-events-none"}`}>Opret bruger</Button>
        </Form>
    )
}