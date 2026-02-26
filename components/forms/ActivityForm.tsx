"use client"

import { useActionState } from "react";
import Form from "next/form";
import type { Activity, FormState } from "@/app/api/types";
import { createActivity, editActivity } from "@/app/api/actions";
import Button from "../buttons/Button";
import InputWrapper from "./InputWrapper";

type ActivityFormProps = {
    edit?: Activity;
    className?: string;
}

export default function ActivityForm({ edit, className }: ActivityFormProps) {
    const initialState: FormState = {
        message: "",
        errors: {
            fieldErrors: {}
        },
        inputs: {
            name: edit ? edit.name ? edit.name : "" : "",
            description: edit ? edit.description ? edit.description : "" : "",
            weekday: edit ? edit.weekday ? edit.weekday : "" : "",
            time: edit ? edit.time ? edit.time : "" : "",
            minAge: edit ? edit.minAge ? edit.minAge : "" : "",
            maxAge: edit ? edit.maxAge ? edit.maxAge : "" : "",
            instructorId: edit ? edit.instructorId ? edit.instructorId : "" : "",
            maxParticipants: edit ? edit.maxParticipants ? edit.maxParticipants : "" : "",
            file: "",
        }
    }

    const [state, formAction, pending] = useActionState(edit ? editActivity : createActivity, initialState)
    // console.log("state:", state)

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
                    defaultValue={state.inputs.name ? state.inputs.name : ""}
                    className="form-input"
                />
            </InputWrapper>
            <InputWrapper className="col-span-2" error={state.errors.fieldErrors.description ? state.errors.fieldErrors.description[0] : ""}>
                <textarea
                    name="description" id="description"
                    placeholder="Beskrivelse"
                    defaultValue={state.inputs.description ? state.inputs.description : ""}
                    className="form-input py-3 h-32 col-span-2 resize-none"
                ></textarea>
            </InputWrapper>
            

            <InputWrapper error={state.errors.fieldErrors.weekday ? state.errors.fieldErrors.weekday[0] : ""}>
                <select
                    name="weekday" id="weekday"
                    defaultValue={state.inputs.weekday ? state.inputs.weekday : ""}
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
            <InputWrapper error={state.errors.fieldErrors.time ? state.errors.fieldErrors.time[0] : ""}>
                <input
                    type="text"
                    name="time" id="time"
                    placeholder="Tidspunkt"
                    defaultValue={state.inputs.time ? state.inputs.time : ""}
                    className="form-input"
                />
            </InputWrapper>

            <InputWrapper error={state.errors.fieldErrors.minAge ? state.errors.fieldErrors.minAge[0] : ""}>
                <input
                    type="number"
                    name="minAge" id="minAge"
                    placeholder="Alder (min.)"
                    defaultValue={state.inputs.minAge ? state.inputs.minAge : ""}
                    className="form-input-number"
                />
            </InputWrapper>
            <InputWrapper error={state.errors.fieldErrors.maxAge ? state.errors.fieldErrors.maxAge[0] : ""}>
                <input
                    type="number"
                    name="maxAge" id="maxAge"
                    placeholder="Alder (max.)"
                    defaultValue={state.inputs.maxAge ? state.inputs.maxAge : ""}
                    className="form-input-number"
                />
            </InputWrapper>

            <InputWrapper error={state.errors.fieldErrors.instructorId ? state.errors.fieldErrors.instructorId[0] : ""}>
                <select
                    name="instructorId" id="instructorId"
                    defaultValue={state.inputs.instructorId ? state.inputs.instructorId : ""}
                    className="form-input"
                >
                    <option value="" disabled>Instruktør</option>
                    <option value="1">instructor1</option>
                    <option value="2">instructor2</option>
                    <option value="3">instructor3</option>
                    <option value="4">instructor4</option>
                </select>
            </InputWrapper>
            <InputWrapper error={state.errors.fieldErrors.maxParticipants ? state.errors.fieldErrors.maxParticipants[0] : ""}>
                <input
                    type="number"
                    name="maxParticipants" id="maxParticipants"
                    placeholder="Deltagere (max.)"
                    defaultValue={state.inputs.maxParticipants ? state.inputs.maxParticipants : ""}
                    className="form-input-number"
                />
            </InputWrapper>

            <InputWrapper className="space-y-2 col-span-2" error={state.errors.fieldErrors.file ? state.errors.fieldErrors.file[0] : ""}>
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

            <Button className={`px-18 justify-self-center col-span-2 ${pending && "opacity-50 pointer-events-none"}`}>
                {edit ? "Ret hold" : "Opret hold"}
            </Button>
        </Form>
    )
}