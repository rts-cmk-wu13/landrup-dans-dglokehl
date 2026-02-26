import { FaUserLarge } from "react-icons/fa6";
import type { User } from "@/app/api/types"

type ParticipantCardProps = {
    user: User;
    className?: string;
}

export default function ParticipantCard({ user, className }: ParticipantCardProps) {
    return (
        <article className={`p-2.5 flex items-center justify-between bg-white/80 text-app-bg rounded-[10px] ${className ? className : ""}`}>
            <div className="flex items-center gap-2.5">
                <FaUserLarge className="size-5" />
                <p className="text-lg">{user.firstname} {user.lastname}</p>
            </div>
            <p className="text-sm">{user.age} år</p>
        </article>
    )
}