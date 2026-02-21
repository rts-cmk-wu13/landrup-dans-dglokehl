type ButtonProps = {
    children: React.ReactNode;
    className?: string;
}

export default function Button({ children, className }: ButtonProps) {
    return (
        <div className={`py-4 bg-app-white text-app-bg text-center rounded-[10px] shadow-button hover-scale-105 ${className ? className : ""}`}>
            {children}
        </div>
    )
}