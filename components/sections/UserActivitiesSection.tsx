import type { Activity } from "@/app/api/types"
import ProfileActivityCard from "../cards/ProfileActivityCard"

type UserActivitiesSectionProps = {
    userActivities: Activity[];
    className?: string;
}

export default function UserActivitiesSection({ userActivities, className }: UserActivitiesSectionProps) {
    return (
        <section className={`space-y-4 ${className ? className : ""}`}>
            <h2 className="text-2xl font-medium">Tilmeldte hold</h2>
            {userActivities.map((item, i: number) => <ProfileActivityCard activity={item} key={i} />)}
        </section>
    )
}