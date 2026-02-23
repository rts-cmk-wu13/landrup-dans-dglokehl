"use client"

import { useState } from "react";
import { LuSearch } from "react-icons/lu";

type SearchBarProps = {
    children?: React.ReactNode;
    className?: string;
}

export default function SearchBar({ className }: SearchBarProps) {
    const [open, setOpen] = useState(false);

    const submitSearch = (e: React.SubmitEvent<HTMLFormElement>) => {
        const query = e.currentTarget.q.value
        if (!query) {
            e.preventDefault()
            setOpen(false)
            return
        }
        console.log("query:", query)
    }

    return (
        <div className={`size-full flex items-center justify-end relative ${className ? className : ""}`}>
            {!open ? (
                <LuSearch className="size-6 absolute right-3 hover-75" onClick={() => setOpen(!open)} />
            ) : (
                <form action="" noValidate onSubmit={submitSearch} className="w-full flex items-center relative">
                    <button className="absolute right-3 z-2">
                        <LuSearch className="size-6 hover-75" />
                    </button>
                    <input
                        type="search"
                        name="q" id="q"
                        autoFocus
                        className="form-input pr-11! bg-[#C4C4C4]/30! text-app-white! rounded-xl rounded-br-none"
                    />
                </form>
            )}
        </div>
    )
}