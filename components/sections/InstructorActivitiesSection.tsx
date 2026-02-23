import type { Activity } from "@/app/api/types"
import ProfileActivityCard from "../cards/ProfileActivityCard"

type InstructorActivitiesSectionProps = {
    userActivities: Activity[];
    className?: string;
}

export default function InstructorActivitiesSection({ userActivities, className }: InstructorActivitiesSectionProps) {
    return (
        <section className={`${className ? className : ""}`}>
            <h2 className="text-2xl font-medium">Mine hold</h2>
            {userActivities.map((item, i: number) => <ProfileActivityCard activity={item} role="instructor" key={i} />)}
        </section>
    )
}