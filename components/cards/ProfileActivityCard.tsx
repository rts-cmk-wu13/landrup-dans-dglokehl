import type { Activity } from "@/app/api/types";
import Button from "../buttons/Button"

type ProfileActivityCardProps = {
    activity: Activity;
    role?: "default" | "instructor";
    className?: string;
}

export default function ProfileActivityCard({ activity, role, className }: ProfileActivityCardProps) {
    return (
        <article className={`space-y-4 px-6 py-4 bg-white/80 text-app-bg rounded-xl ${className ? className : ""}`}>
            <div className="space-y-2">
                <h3 className="text-2xl font-medium">{activity.name}</h3>
                <p className="text-lg"><span className="capitalize">{activity.weekday}</span> kl. {activity.time}</p>
            </div>
            <Button href={`/activities/${activity.id}`} className="py-2.5! w-38" color="dark">Vis hold</Button>
        </article>
    )
}