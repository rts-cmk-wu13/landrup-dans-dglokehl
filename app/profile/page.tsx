import { redirect } from "next/navigation"
import type { Activity } from "../api/types";
import Main from "@/components/layout/Main"
import ProfileHeader from "./_components/ProfileHeader";
import UserActivitiesSection from "@/components/sections/UserActivitiesSection";
import InstructorActivitiesSection from "@/components/sections/InstructorActivitiesSection";
import { fetchDefault, fetchCurrentUser } from "../api/fetches"

export const metadata = {
    title: "Min Profil"
}

export default async function ProfilePage() {
    const user = await fetchCurrentUser(600)
    if (!user) redirect("/login")
    console.log("user:", user)

    let instructorActivities: Activity[] | [] = []
    if (user.role === "instructor") {
        const activities: Activity[] = await fetchDefault("http://localhost:4000/api/v1/activities", 600)
        instructorActivities = activities.filter((activity) => activity.instructorId === user.id)
    }
    console.log("instructorActivities:", instructorActivities)

    return (
        <>
            <ProfileHeader user={user} />
            <Main>
                {user.role === "default" && user.activities.length > 0 && <UserActivitiesSection userActivities={user.activities} />}
                {user.role === "instructor" && instructorActivities.length > 0 && <InstructorActivitiesSection userActivities={instructorActivities} />}
            </Main>
        </>
    )
}