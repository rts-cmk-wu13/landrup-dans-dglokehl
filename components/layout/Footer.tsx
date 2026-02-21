"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome } from "react-icons/fi";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { FaUser } from "react-icons/fa";

const footerItems = [
    {
        href: "/",
        icon: <FiHome />,
        text: "Home",
    },
    {
        href: "/activities",
        icon: <MdOutlineFormatListBulleted />,
        text: "Aktiviteter",
    },
    {
        href: "/profile",
        icon: <FaUser />,
        text: "Profil",
    },
]

export default function Footer() {
    const pathname = usePathname()
    const pathnameArr = pathname.split("/")

    return (
        <footer className="px-3 h-footer fixed bottom-0 inset-x-0 z-999 bg-app-white">
            <nav className="size-full flex justify-between items-center gap-5 *:hover-75">
                {footerItems.map((item: any, i: number) => (
                    <Link href={item.href} key={i} className={`flex flex-col items-center gap-1 ${`/${pathnameArr[1]}` === item.href ? "text-app-black" : "text-app-grey-medium"}`}>
                        <figure className="px-4.5 *:size-6">
                            {item.icon}
                        </figure>
                        <span className="text-2xs text-center">
                            {item.text}
                        </span>
                    </Link>
                ))}
            </nav>
        </footer>
    )
}