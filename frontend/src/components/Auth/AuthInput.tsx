import React, { type ReactNode } from "react";

interface AuthInputProps {
    label: string;
    type: 'email' | 'password' | 'text';
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    required: boolean;
}

const AuthInput: React.FC<AuthInputProps> = ({
    label,
    type,
    placeholder,
    value,
    onChange,
    required
}) => {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-300">{label}</label>
            <input 
            type={type} 
            placeholder={placeholder}
            value={value}
            onChange={(e)=> onChange(e.target.value)}
            required={required}
            className="w-full  px-4 py-3 bg-[#333] border border-grey-600 rounded-xl focus:ring-2
                    focus-ring-blue-500 focus:border-transparent outline-none transition-all
                    placeholder:text-grey-500"/>
        </div>
    )
}

export default AuthInput;