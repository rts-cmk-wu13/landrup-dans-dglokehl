import Link from "next/link"
import type { Activity } from "@/app/api/types"

type ActivityCardProps = {
    data: Activity;
    className?: string;
}

export default function ActivityCard({ data, className }: ActivityCardProps) {
    return (
        <Link href={`/activities/${data.id}`} className={`h-90 block rounded-[39px] rounded-br-none overflow-hidden ${className ? className : ""}`}>
            <article className="size-full relative">
                <div className="p-6 pt-4.5 absolute inset-x-0 bottom-0 rounded-tr-[39px] bg-app-bg/75">
                    <p className="text-xl font-bold">{data.name}</p>
                    <p className="text-lg">{data.maxAge < 100 ? <>{data.minAge}-{data.maxAge} år</> : <>{data.minAge}+ år</>}  </p>
                </div>
                <img src={data.asset.url} alt="" className="size-full object-cover" />
            </article>
        </Link>
    )
}