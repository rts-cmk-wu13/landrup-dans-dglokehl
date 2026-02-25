import Link from "next/link";
import type { Activity } from "@/app/api/types"
import { FaSquarePlus } from "react-icons/fa6";
import ProfileActivityCard from "../cards/ProfileActivityCard"

type InstructorActivitiesSectionProps = {
    activities: Activity[];
    className?: string;
}

export default function InstructorActivitiesSection({ activities, className }: InstructorActivitiesSectionProps) {
    return (
        <section className={`space-y-4 ${className ? className : ""}`}>
            <div className="flex justify-between items-end">
                <h2 className="text-2xl font-medium">Mine hold</h2>
                <Link href="/profile/activities/new">
                    <FaSquarePlus className="size-9 text-app-white hover-75" />
                </Link>
            </div>
            {activities.map((item, i: number) => <ProfileActivityCard activity={item} instructor key={i} />)}
        </section>
    )
}