import { redirect } from "next/navigation"
import { FaUserLarge } from "react-icons/fa6";
import Main from "@/components/layout/Main"
import UserActivitiesSection from "@/components/sections/UserActivitiesSection";
import InstructorActivitiesSection from "@/components/sections/InstructorActivitiesSection";
import { fetchCurrentUser } from "../api/fetches"

export default async function ProfilePage() {
    const user = await fetchCurrentUser(600)
    if (!user) redirect("/login")
    console.log("user:", user)

    return (
        <>
            <header className="p-default">
                <h1 className="text-2xl font-medium text-center">Min Profil</h1>
            </header>

            <Main className="space-y-11">
                <section className="py-4 flex flex-col items-center gap-3.5 bg-app-white text-app-bg text-center">
                    <FaUserLarge className="size-16" />
                    <div className="space-y-1">
                        <h2 className="text-3xl font-medium">{user.firstname} {user.lastname}</h2>
                        <p className="text-lg capitalize">{user.role}</p>
                    </div>
                </section>

                {user.role === "default" && user.activities && <UserActivitiesSection userActivities={user.activities} />}
                {user.role === "instructor" && user.activities && <InstructorActivitiesSection userActivities={user.activities} />}
            </Main>
        </>
    )
}