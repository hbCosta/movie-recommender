import axios from 'axios';

interface LoginCredentials {
    email: string;
    password: string;
}

interface RegisterData {
    name: string;
    email: string;
    password: string;
}

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authAPI = {
    login: (credentials: LoginCredentials) => api.post('/auth/login', credentials),
    register: (userData: RegisterData) => api.post('/auth/register', userData),
};

export const movieAPI = {
    search: (query: string) => api.get('/movies/search', { params: { query } }),
    getDetails: (id: string) => api.get(`/movies/${id}`),
    getPopular: () => api.get('/movies/popular'),
};

export const ratingAPI ={
    create: (data: any) => api.post('/ratings', data),
    getByUser: (userId: string) => api.get(`/ratings/user/${userId}`),
}


export default api;

