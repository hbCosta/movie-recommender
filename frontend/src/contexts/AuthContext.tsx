import { createContext, useState, useContext, useEffect } from "react";
import type { ReactNode } from "react";
import * as authService from "../services/auth.service";


interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
    setAuth: (user: User | null) => void;
}

interface AuthProviderProps {
    children: ReactNode;
}


const AuthContextInstance = createContext<AuthContextType | undefined>(undefined);


const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setuser] = useState<User | null>(null);
    useEffect(() => {
        const storeduser = localStorage.getItem('user');
        if (storeduser) {
            try {
                setuser(JSON.parse(storeduser));
            } catch (error) {
                console.error('Erro ao carregar usuário do localStorage:', error);
                localStorage.removeItem('user');
            }
        }
    }, []);

    const login = async (email: string, password: string) => {
        const result = await authService.login(email, password);
        if (result.success && result.user) {
            setuser(result.user);
            return { success: true };
        }
        return { success: false, error: result.error };
    };

    const register = async (name: string, email: string, password: string) => {
        const result = await authService.register(name, email, password);

        if (result.success && result.user) {
            setuser(result.user);
            return { success: true };
        }
        return { success: false, error: result.error };
    };

    const logout = () => {
        authService.logout();
        setuser(null);
    };

    const setAuth = (authUser: User | null) => {
        setuser(authUser);
        if (authUser) {
            localStorage.setItem('user', JSON.stringify(authUser));
        } else {
            localStorage.removeItem('user');
        }
    };


    const value: AuthContextType = {
        user,
        isAuthenticated: user !== null,
        login,
        register,
        logout,
        setAuth
    };

    return (
        <AuthContextInstance.Provider value={value}>
            {children}
        </AuthContextInstance.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContextInstance);
    if (context === undefined) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
}

export default AuthProvider;