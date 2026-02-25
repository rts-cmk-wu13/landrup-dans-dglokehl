import Link from "next/link"

type ButtonProps = {
    children: React.ReactNode;
    href?: string;
    darkBg?: boolean;
    className?: string;
}

export default function Button({ children, href, darkBg, className }: ButtonProps) {
    const buttonStyle = `py-4 block ${darkBg ? "bg-app-bg text-app-white" : "bg-app-white text-app-bg"} text-lg text-center rounded-[10px] shadow-button border-0 hover-scale-105 ${className ? className : ""}`

    return (
        <>
            {href ? (
                <Link href={href} className={buttonStyle}>
                    {children}
                </Link>
            ) : (
                <button className={buttonStyle}>
                    {children}
                </button>
            )}
        </>
    )
}