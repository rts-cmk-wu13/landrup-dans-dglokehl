type InputWrapperProps = {
    children: React.ReactNode;
    error?: string;
    className?: string;
}

export default function InputWrapper({ children, error, className }: InputWrapperProps) {
    return (
        <div className={`${className ? className : ""}`}>
            {children}
            {error && <p className="mt-1 text-red-400">{error}</p>}
        </div>
    )
}