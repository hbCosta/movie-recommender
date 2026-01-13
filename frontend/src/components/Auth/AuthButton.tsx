import { type ReactNode } from "react";


interface AuthButtonsProps {
    children: ReactNode;
    type: 'submit' | 'button' | 'reset';
}

const AuthButton: React.FC<AuthButtonsProps> = ({children, type}) => {
    return (
        <button
        type={type}
        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bol py-3
        rounded-xl transition-all shadow-lg shadow-blue-900/20 mt-4 active-scale-[0.98]">
            {children}
        </button>
    )

}

export default AuthButton;
