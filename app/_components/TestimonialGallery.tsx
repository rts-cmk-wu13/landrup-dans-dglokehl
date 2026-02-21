"use client"

import { useState } from "react"

import { IoChevronBackCircleOutline, IoChevronForwardCircleOutline } from "react-icons/io5";

type TestimonialGalleryProps = {
    data: {
        id: number;
        content: string;
        name: string;
        occupation: string;
        createdAt: string;
        updatedAt: string;
    }[];
    className?: string;
}

export default function TestimonialGallery({ data, className }: TestimonialGalleryProps) {
    const [index, setIndex] = useState(0);

    return (
        <section className={`py-5 flex flex-col items-center bg-app-blue text-center *:max-w-2/3 ${className ? className : ""}`}>
            <h2 className="text-3xl font-medium">Det siger vores kunder om os</h2>
            <div className="mt-2.5 py-6 flex flex-col items-center gap-6">
                <p>{data[index].content}</p>
                <div>
                    <p className="text-xl font-bold">{data[index].name}</p>
                    <p className="text-sm font-light">{data[index].occupation}</p>
                </div>
            </div>

            <div className="flex gap-3 *:size-11 *:hover-75">
                <IoChevronBackCircleOutline onClick={() => index > 0 && setIndex(index - 1)} />
                <IoChevronForwardCircleOutline onClick={() => index < data.length - 1 && setIndex(index + 1)} />
            </div>
        </section>
    )
}