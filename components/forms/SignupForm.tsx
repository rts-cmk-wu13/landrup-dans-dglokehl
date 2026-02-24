// "use client"

import Form from "next/form";
import Button from "../buttons/Button";
import { authSignup } from "@/app/api/auth";

type SignupFormProps = {
    className?: string;
}

export default function SignupForm({ className }: SignupFormProps) {
    return (
        <Form
            action={authSignup}
            noValidate
            className={`flex flex-col items-center gap-5 ${className ? className : ""}`}
        >
            <input type="text" name="firstname" id="firstname" placeholder="Fornavn" className="form-input" />
            <input type="text" name="lastname" id="lastname" placeholder="Efternavn" className="form-input" />
            <input type="text" name="username" id="username" placeholder="Brugernavn" className="form-input" />
            <input type="number" name="age" id="age" placeholder="Alder" className="form-input" />
            <input type="password" name="password" id="password" placeholder="Adgangskode" className="form-input" />
            <input type="password" name="passwordConfirm" id="passwordConfirm" placeholder="Gentag adgangskode" className="form-input" />
            <Button className="px-22">Opret bruger</Button>
        </Form>
    )
}