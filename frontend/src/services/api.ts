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

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
    baseURL: `${API_BASE_URL}/api`,
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
    getRecommendations: () => api.get('/movies/recommendations'),
};

export const ratingAPI ={
    create: (data: any) => api.post(`/ratings/${data.movieId}`, {rating: data.rating}),
    getByUser: () => api.get(`/ratings/me/all`),
    delete: (movieId: number) => api.delete(`/ratings/${movieId}`),
}


export default api;

