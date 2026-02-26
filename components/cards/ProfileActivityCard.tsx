import { LuSquarePen, LuTrash } from "react-icons/lu";
import type { Activity } from "@/app/api/types";
import Button from "../buttons/Button"

type ProfileActivityCardProps = {
    activity: Activity;
    instructor?: boolean;
    className?: string;
}

export default function ProfileActivityCard({ activity, instructor, className }: ProfileActivityCardProps) {
    return (
        <article className={`space-y-4 px-6 py-4 bg-white/80 text-app-bg rounded-xl ${className ? className : ""}`}>
            <div className="space-y-2">
                <h3 className="text-2xl font-medium">{activity.name}</h3>
                <p className="text-lg"><span className="capitalize">{activity.weekday}</span> kl. {activity.time}</p>
            </div>
            {!instructor && <Button href={`/activities/${activity.id}`} className="py-2.5! w-38" darkBg>Vis hold</Button>}

            {instructor && (
                <>
                    <div className="flex justify-between">
                        <p>Max. deltagere: {activity.maxParticipants}</p>
                        <p>Tilmeldte: {activity.users.length}</p>
                    </div>

                    <div className="flex items-center justify-between">
                        <Button href={`/profile/activities/${activity.id}/participants`} className="py-2.5! w-38" darkBg>Deltagerliste</Button>

                        <div className="flex gap-3">
                            <Button href={`/profile/activities/${activity.id}/edit`} className="size-11 *:size-6 flex items-center justify-center" darkBg>
                                <LuSquarePen />
                            </Button>
                            <Button href={`/profile/activities/${activity.id}/delete`} className="size-11 *:size-6 flex items-center justify-center" darkBg>
                                <LuTrash />
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </article>
    )
}