import React, { type ReactNode } from "react";

interface AuthFormProps {
    children: ReactNode;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ children, onSubmit }) => {
    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
            {children}
        </form>
    );
};

export default AuthForm;