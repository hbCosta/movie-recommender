import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();


export class TmdbService {
    private apiKey: string;
    private baseUrl: string;

    constructor(){
        this.apiKey = process.env.TMDB_API_KEY || '';
        this.baseUrl = process.env.TMDB_BASE_URL || '';
    }

    async searchMovies(query: string, page: number = 1){
        try{
            const response = await axios.get(`${this.baseUrl}/search/movie`,{
                params: {
                    api_key: this.apiKey,
                    query: query,
                    page: page,
                    language: 'pt-BR'
                }
            });

            return response.data;
        } catch (error) {
            console.error('Erro ao buscar filmes no IMDb:', error);
            throw error;
        }
    }

    async getMovieDetails(movieId: number) {
        try{
            const response = await axios.get(`${this.baseUrl}/movie/${movieId}`,{
                params: {
                    api_key: this.apiKey,
                    language: 'pt-BR'
                }
            });
            return response.data;
        }catch (error) {
            console.error('Erro ao buscar detalhes do filme no TMDb', error);
            throw error;
        }
    }

    async getPopularMovies(page: number){
        try{
            const response = await axios.get(`${this.baseUrl}/movie/popular`,{
                params: {
                    api_key: this.apiKey,
                    page: page,
                    language: 'pt-BR'
                }
            });
            return response.data;
        } catch (error){
            console.error('Erro ao listar filmes populares no TMDb', error);
            throw error;
        }
    }

    async getGenres(){
        try {
            const response = await axios.get(`${this.baseUrl}/genre/movie/list`,{
                params:{
                    api_key: this.apiKey, 
                    language: 'pt-BR'
                }
            });
            return response.data;            
        } catch (error) {
            console.error("Erro ao listar generos", error);
            throw error;
        }
    }

    async discoverByGenres(genreIds: number [], page: number){
        try {
            const response = await axios.get(`${this.baseUrl}/discover/movie`, {
                params: {
                    api_key: this.apiKey,
                    with_genres: genreIds,
                    page: page,
                    language: 'pt-BR'
                }
            });
            return response.data;
        } catch (error) {
            console.error("Erro ao pesquisar por generos", error);
            throw error;
        }
    }
}