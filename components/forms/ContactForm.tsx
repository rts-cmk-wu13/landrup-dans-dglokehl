"use client"

import { useActionState } from "react";
import Form from "next/form";
import type { FormState } from "@/app/api/types";
import { sendContactMessage } from "@/app/api/actions";
import InputWrapper from "./InputWrapper";
import Button from "../buttons/Button";

type ContactFormProps = {
    children?: React.ReactNode;
    className?: string;
}

export default function ContactForm({ className }: ContactFormProps) {
    const initialState: FormState = {
        message: "",
        errors: {
            fieldErrors: {}
        },
        inputs: {
            name: "",
            email: "",
            message: "",
        }
    }

    const [state, formAction, pending] = useActionState(sendContactMessage, initialState)
    // console.log("state:", state)

    return (
         <>
            <Form 
                action={formAction}
                noValidate
                className={`w-full flex flex-col items-center gap-5 ${className ? className : ""}`}
            >
                <InputWrapper error={state.errors.fieldErrors.name ? state.errors.fieldErrors.name[0] : ""}>
                    <input
                        type="text"
                        name="name" id="name"
                        placeholder="Navn"
                        defaultValue={state.inputs.name ? state.inputs.name : ""}
                        className="form-input"
                    />
                </InputWrapper>
                <InputWrapper error={state.errors.fieldErrors.email ? state.errors.fieldErrors.email[0] : ""}>
                    <input
                        type="email"
                        name="email" id="email"
                        placeholder="Email"
                        defaultValue={state.inputs.email ? state.inputs.email : ""}
                        className="form-input"
                    />
                </InputWrapper>
                <InputWrapper error={state.errors.fieldErrors.message ? state.errors.fieldErrors.message[0] : ""}>
                    <textarea
                        name="message" id="message"
                        placeholder="Besked"
                        defaultValue={state.inputs.message ? state.inputs.message : ""}
                        className="form-input py-3 h-32 resize-none"
                    ></textarea>
                </InputWrapper>

                <Button className={`px-16 ${pending && "opacity-50 pointer-events-none"}`}>Send besked</Button>
            </Form>

            <p className="mt-3 text-center text-green-400">{state.message}</p>
        </>
    )
}