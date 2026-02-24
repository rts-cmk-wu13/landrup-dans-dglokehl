"use client"

import { useActionState } from "react";
import Form from "next/form";
import type { Activity } from "@/app/api/types";
import { createActivity, editActivity, FormState } from "@/app/api/actions";
import Button from "../buttons/Button";
import InputWrapper from "./InputWrapper";

type ActivityFormProps = {
    edit?: Activity;
    className?: string;
}
const initialState: FormState = {
    message: "",
    errors: {
        fieldErrors: {}
    },
}
export default function ActivityForm({ edit, className }: ActivityFormProps) {
    const [state, formAction, pending] = useActionState(edit ? editActivity : createActivity, initialState)
    console.log("state:", state)
    return (
        <Form
            action={formAction}
            noValidate
            className={`grid grid-cols-2 gap-5 ${className ? className : ""}`}
        >
            <InputWrapper className="col-span-2" error={state.errors.fieldErrors.name ? state.errors.fieldErrors.name[0] : ""}>
                <input
                    type="text"
                    name="name" id="name"
                    placeholder="Holdnavn"
                    defaultValue={edit ? edit.name : ""}
                    className="form-input"
                />
            </InputWrapper>
            <InputWrapper className="col-span-2">
                <textarea
                    name="description" id="description"
                    placeholder="Beskrivelse"
                    defaultValue={edit ? edit.description : ""}
                    className="form-input py-3 h-32 col-span-2 resize-none"
                ></textarea>
            </InputWrapper>
            

            <InputWrapper>
                <select
                    name="weekday" id="weekday"
                    defaultValue={edit ? edit.weekday : ""}
                    className="form-input"
                >
                    <option value="" disabled>Ugedag</option>
                    <option value="mandag">Mandag</option>
                    <option value="tirsdag">Tirsdag</option>
                    <option value="onsdag">Onsdag</option>
                    <option value="torsdag">Torsdag</option>
                    <option value="fredag">Fredag</option>
                    <option value="lørdag">Lørdag</option>
                    <option value="søndag">Søndag</option>
                </select>
            </InputWrapper>
            <InputWrapper>
                <input
                    type="text"
                    name="time" id="time"
                    placeholder="Tidspunkt"
                    defaultValue={edit ? edit.time : ""}
                    className="form-input"
                />
            </InputWrapper>

            <InputWrapper>
                <input
                    type="number"
                    name="minAge" id="minAge"
                    placeholder="Alder (min.)"
                    defaultValue={edit ? edit.minAge : ""}
                    className="form-input"
                />
            </InputWrapper>
            <InputWrapper>
                <input
                    type="number"
                    name="maxAge" id="maxAge"
                    placeholder="Alder (max.)"
                    defaultValue={edit ? edit.maxAge : ""}
                    className="form-input"
                />
            </InputWrapper>

            <InputWrapper>
                <select
                    name="instructorId" id="instructorId"
                    defaultValue={edit ? edit.instructorId : ""}
                    className="form-input"
                >
                    <option value="" disabled>Instruktør</option>
                    <option value="1">instructor1</option>
                    <option value="2">instructor2</option>
                    <option value="3">instructor3</option>
                    <option value="4">instructor4</option>
                </select>
            </InputWrapper>
            <InputWrapper>
                <input
                    type="number"
                    name="maxParticipants" id="maxParticipants"
                    placeholder="Deltagere (max.)"
                    defaultValue={edit ? edit.maxParticipants : ""}
                    className="form-input"
                />
            </InputWrapper>

            <InputWrapper className="space-y-2 col-span-2">
                <p className="text-lg">Billede:</p>
                <input
                    type="file"
                    name="file" id="file"
                    accept="image/*"
                    className="w-full file:mr-2.5 file:py-1 file:px-2.5 file:bg-app-white file:text-app-black file:rounded-sm file:hover-75"
                />
            </InputWrapper>

            {edit && (
                <input type="hidden" name="activityId" id="activityId" value={edit.id} />
            )}

            <Button className="px-18 justify-self-center col-span-2">
                {edit ? "Ret hold" : "Opret hold"}
            </Button>
        </Form>
    )
}