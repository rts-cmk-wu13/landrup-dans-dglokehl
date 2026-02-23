import Link from "next/link"

type ButtonProps = {
    children: React.ReactNode;
    href?: string;
    onClick?: () => void;
    className?: string;
}

export default function Button({ children, href, onClick, className }: ButtonProps) {
    const buttonStyle = `py-4 bg-app-white text-app-bg text-lg text-center rounded-[10px] shadow-button border-0 hover-scale-105 ${className ? className : ""}`

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