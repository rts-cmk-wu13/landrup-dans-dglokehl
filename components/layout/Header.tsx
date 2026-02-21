"use client"

import { usePathname, useRouter } from "next/navigation";
import { IoChevronBackOutline } from "react-icons/io5";
import Search from "../buttons/Search";

export default function Header() {
    const pathname = usePathname()
    const pathnameArr = pathname.split("/")
    const router = useRouter()

    return (
        <header className="wrapper-default px-default h-header flex justify-between items-center gap-4 fixed top-0 inset-x-0 z-999 pointer-events-none">
            <figure className="size-6 *:size-6 *:hover-75 *:pointer-events-auto">
                {(pathnameArr.length > 2 || pathnameArr[1] === "search") && <IoChevronBackOutline onClick={() => router.back()} />}
            </figure>
            {pathnameArr[1] !== "search" && <Search />}
        </header>
    )
}