import Form from "next/form";
import type { Activity } from "@/app/api/types";
import { addUserToActivity, removeUserFromActivity } from "@/app/api/actions";
import { fetchCurrentUser } from "@/app/api/fetches";
import Button from "./Button";

type ActivityRegisterButtonProps = {
    activity: Activity;
    className?: string;
}

export default async function ActivityRegisterButton({ activity, className }: ActivityRegisterButtonProps) {
    const addUserToActivityWithId = addUserToActivity.bind(null, activity.id)
    const removeUserFromActivityWithId = removeUserFromActivity.bind(null, activity.id)

    const user = await fetchCurrentUser()
    if (!user) return
    // console.log("user:", user)


    const isInstructor = user.id === activity.instructorId

    if (user.age > activity.maxAge || user.age < activity.minAge) {
        if (!isInstructor) return
    }
    if (activity.users.length >= activity.maxParticipants) {
        if (!isInstructor) return
    }

    const isRegistered = user.activities.some((userActivity: Activity) => activity.id === userActivity.id)
    console.log("isRegistered:", isRegistered)


    let buttonText = "Tilmeld"
    if (isRegistered) buttonText = "Forlad"
    if (isInstructor) buttonText = "Deltagerliste"

    return (
        <Form
            action={!isRegistered ? addUserToActivityWithId : removeUserFromActivityWithId}
            noValidate
        >
            <Button
                className={`${isInstructor ? "px-18" : "px-22"} absolute bottom-7 right-7 ${className ? className : ""}`}
                darkBg
                href={isInstructor ? `http://localhost:3000/profile/activities/${activity.id}/participants` : ""}
            >
                {buttonText}
            </Button>
        </Form>
    )
}