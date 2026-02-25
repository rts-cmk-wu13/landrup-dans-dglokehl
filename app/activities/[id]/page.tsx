import type { Activity } from "@/app/api/types";
import Main from "@/components/layout/Main";
import ActivityRegisterButton from "@/components/buttons/ActivityRegisterButton";
import { fetchDefault } from "@/app/api/fetches";
import { formatMinMaxAges } from "@/utils/helpers";
import { getToken } from "@/utils/cookies";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

	const activity = await fetchDefault(`http://localhost:4000/api/v1/activities/${id}`);

	return {
		title: activity.name
	}
}

export default async function ActivityDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const activity: Activity = await fetchDefault(`http://localhost:4000/api/v1/activities/${id}`);
    // console.log("activity:", activity)

    const token = await getToken()

    return (
        <>
            <div className="relative">
                {token && <ActivityRegisterButton activity={activity} />}
                <img src={activity.asset.url} alt="" className="h-120 w-full object-cover" />
            </div>
            <Main className="text-lg">
                <h1 className="text-2xl font-medium">{activity.name}</h1>
                <p>{formatMinMaxAges(activity.minAge, activity.maxAge)} <span className="mx-1">·</span> <span className="capitalize">{activity.weekday}</span> kl. {activity.time}</p>
                <p className="mt-3">{activity.description}</p>
            </Main>
        </>
    )
}