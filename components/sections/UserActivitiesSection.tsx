import type { Activity } from "@/app/api/types"
import ProfileActivityCard from "../cards/ProfileActivityCard"

type UserActivitiesSectionProps = {
    activities: Activity[];
    className?: string;
}

export default function UserActivitiesSection({ activities, className }: UserActivitiesSectionProps) {
    return (
        <section className={`space-y-4 ${className ? className : ""}`}>
            <h2 className="text-2xl font-medium">Tilmeldte hold</h2>
            {activities.map((item, i: number) => <ProfileActivityCard activity={item} key={i} />)}
        </section>
    )
}