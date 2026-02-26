import Link from "next/link"
import type { Activity } from "@/app/api/types"
import { formatMinMaxAges } from "@/utils/helpers"

type ActivityCardProps = {
    activity: Activity;
    className?: string;
}

export default function ActivityCard({ activity, className }: ActivityCardProps) {
    return (
        <Link href={`/activities/${activity.id}`} className={`h-90 block rounded-[39px] rounded-br-none overflow-hidden ${className ? className : ""}`}>
            <article className="size-full relative">
                <div className="p-6 pt-4.5 absolute inset-x-0 bottom-0 rounded-tr-[39px] bg-app-bg/75">
                    <p className="text-xl font-bold">{activity.name}</p>
                    <p className="text-lg">{formatMinMaxAges(activity.minAge, activity.maxAge)}</p>
                </div>
                <img src={activity.asset.url} alt="" className="size-full object-cover" />
            </article>
        </Link>
    )
}