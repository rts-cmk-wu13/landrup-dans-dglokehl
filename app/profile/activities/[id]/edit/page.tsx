import type { Activity } from "@/app/api/types";
import { fetchDefault } from "@/app/api/fetches";
import Main from "@/components/layout/Main"
import ActivityForm from "@/components/forms/ActivityForm"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const activity: Activity = await fetchDefault(`http://localhost:4000/api/v1/activities/${id}`)

	return {
		title: `Rediger ${activity.name}`
	}
}

export default async function EditActivityPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const activity: Activity = await fetchDefault(`http://localhost:4000/api/v1/activities/${id}`)

    return (
        <Main className="pt-9 space-y-8">
            <h1 className="text-4xl">Rediger hold</h1>
            <ActivityForm edit={activity} />
        </Main>
    )
}