type MainProps = {
    children: React.ReactNode;
    className?: string;
}

export default function Main({ children, className }: MainProps) {
    return (
        <main className={`mb-footer p-default ${className ? className : ""}`}>
            {children}
        </main>
    )
}