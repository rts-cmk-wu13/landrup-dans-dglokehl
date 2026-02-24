import { redirect } from "next/navigation";
import type { Activity } from "@/app/api/types";
import { fetchDefault, fetchCurrentUser } from "@/app/api/fetches";
import ProfileHeader from "@/app/profile/_components/ProfileHeader";
import Main from "@/components/layout/Main";
import ParticipantCard from "@/components/cards/ParticipantCard";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

	const activity: Activity = await fetchDefault(`http://localhost:4000/api/v1/activities/${id}`)

	return {
		title: `Deltagere: ${activity.name}`
	}
}

export default async function ActivityParticipantsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const user = await fetchCurrentUser(600)
    if (!user) redirect("/login")
    console.log("user:", user)

    const activity: Activity = await fetchDefault(`http://localhost:4000/api/v1/activities/${id}`)
    console.log("activity:", activity)

    return (
        <>
            <ProfileHeader user={user} />
            <Main className="space-y-5">
                <h1 className="text-2xl font-medium">{activity.name}</h1>
                <section className="space-y-4">
                    <h2 className="text-lg font-medium">Deltagere:</h2>
                    {activity.users.length > 0 ? activity.users.map((item, i: number) => <ParticipantCard user={item} key={i} />) : <p className="text-center opacity-75">Aktiviteten har ingen deltagere.</p>}
                </section>
            </Main>
        </>
    )
}