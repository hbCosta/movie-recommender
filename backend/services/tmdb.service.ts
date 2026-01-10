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
}