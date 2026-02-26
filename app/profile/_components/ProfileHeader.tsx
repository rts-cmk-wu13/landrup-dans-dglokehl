import { FaUserLarge } from "react-icons/fa6";
import type { User } from "@/app/api/types";

type ProfileHeaderProps = {
    user: User;
    className?: string;
}

export default function ProfileHeader({ user, className }: ProfileHeaderProps) {
    return (
        <header className={`pb-5 ${className ? className : ""}`}>
            <div className="p-default">
                <h1 className="text-2xl font-medium text-center">Min Profil</h1>
            </div>

            <section className="py-4 flex flex-col items-center gap-3.5 bg-app-white text-app-bg text-center">
                <FaUserLarge className="size-16" />
                <div className="space-y-1">
                    <h2 className="text-3xl font-medium">{user.firstname} {user.lastname}</h2>
                    <p className="text-lg capitalize">{user.role}</p>
                </div>
            </section>
        </header>
    )
}