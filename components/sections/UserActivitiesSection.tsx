import Link from "next/link";
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
            {activities.length < 1 && (
                <div className="space-y-1">
                    <p>Du er ikke tilmeldt nogle aktiviteter.</p>
                    <Link href="/activities" className="underline hover-75">Find nye aktiviteter</Link>
                </div>
            )}
        </section>
    )
}