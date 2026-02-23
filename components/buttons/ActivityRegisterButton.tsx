import Form from "next/form";
import Button from "./Button";
import type { Activity } from "@/app/api/types";
import { addUserToActivity, removeUserFromActivity } from "@/app/api/actions";
import { fetchCurrentUser } from "@/app/api/fetches";

type ActivityRegisterButtonProps = {
    activity: Activity;
    className?: string;
}

export default async function ActivityRegisterButton({ activity, className }: ActivityRegisterButtonProps) {
    const user = await fetchCurrentUser()
    console.log("user:", user)

    if (user.age > activity.maxAge || user.age < activity.minAge) return

    const isRegistered = user.activities.some((userActivity: Activity) => activity.id === userActivity.id)
    console.log("isRegistered:", isRegistered)

    const addUserToActivityWithId = addUserToActivity.bind(null, activity.id)
    const removeUserFromActivityWithId = removeUserFromActivity.bind(null, activity.id)

    return (
        <Form
            action={!isRegistered ? addUserToActivityWithId : removeUserFromActivityWithId}
            noValidate
        >
            <Button className={`px-22 absolute bottom-7 right-7 bg-app-bg! text-app-white! ${className ? className : ""}`}>
                {!isRegistered ? "Tilmeld" : "Forlad"}
            </Button>
        </Form>
    )
}