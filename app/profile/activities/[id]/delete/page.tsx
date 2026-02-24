import { fetchDefault } from "@/app/api/fetches";
import type { Activity } from "@/app/api/types";
import Main from "@/components/layout/Main"
import DeleteActivityForm from "@/components/forms/DeleteActivityForm";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const activity: Activity = await fetchDefault(`http://localhost:4000/api/v1/activities/${id}`, 0)

	return {
		title: `Slet: ${activity.name}`
	}
}

export default async function ActivityDeletePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const activity: Activity = await fetchDefault(`http://localhost:4000/api/v1/activities/${id}`, 0)
    console.log("activity:", activity)

    return (
        <Main className="pt-9 space-y-8">
            <h1 className="text-4xl">Slet hold</h1>
            <DeleteActivityForm activity={activity} />
        </Main>
    )
}