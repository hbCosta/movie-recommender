import { authAPI } from './api';

interface AuthResponse {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
}

interface LoginResult {
    success: boolean;
    user?: {
        id: string;
        name: string;
        email: string;
    };
    error?: string;
}


export async function login(email: string, password: string): Promise<LoginResult> {
    try{
        
        const response = await authAPI.login({email, password});
    
        const {token, user} = response.data as AuthResponse;

        localStorage.setItem('token', token);

        localStorage.setItem('user', JSON.stringify(user));

        return {
            success: true,
            user: user
        };
    } catch (error: any){
        const errorMessage = error.response?.data?.message || 'Erro ao realizar login. Tente novamente.';
        return {
            success: false,
            error: errorMessage
        };

    }
}

export async function register(name: string, email: string, password: string): Promise<LoginResult> {
    try{
        const response = await authAPI.register({name, email, password});
        const {token, user} = response.data as AuthResponse;

        localStorage.setItem('token', token);

        localStorage.setItem('user', JSON.stringify(user));   

        return {
            success: true,
            user: user
        };

    }catch(error: any){
        const errorMessage = error.response?.data?.message || 'Erro ao realizar registro. Tente novamente.';
        return {
            success: false,
            error: errorMessage
        };
    }
}

export function logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}