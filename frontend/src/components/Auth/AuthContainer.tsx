import React, { type ReactNode } from "react";

interface AuthContainerProps {
    children: ReactNode;
}


const AuthContainer: React.FC<AuthContainerProps> = ({ children }) => {
    return(
        <div className="min-h-screen flex items-center justify-center dark: bg-[#1a1a1a] px-4 text-white font-sans">
            <div className="w-full max-w-lg bg-[#2a2a2a] p-10 rounded-2xl shadow-2xl border border-white/5">
                {children}
            </div>
        </div>
    )
}

export default AuthContainer;