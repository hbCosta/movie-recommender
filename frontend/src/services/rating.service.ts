import { ratingAPI } from "./api";

interface RatingResult{
    success: boolean,
    data?: any,
    error?: string
}

export async function rateMovie(
    movieId: number, 
    rating: number
):  Promise<RatingResult> {
    try{
        const response = await ratingAPI.create({
            movieId,
            rating
        });
        return{
            success: true,
            data: response.data
        }
    }catch(error: any){
        const errorMessage = 
        error.response?.data?.error||
        'Erro ao avaliar filme';

        return{
            success: false,
            error: errorMessage
        };
    }
}

export async function getUserRatings(): Promise<RatingResult> {
    try {
        const response = await ratingAPI.getByUser();
        return{
            success: true,
            data: response.data
        }
    } catch (error: any) {
        const errorMessage =
        error.response?.data?.error ||
        'Erro ao buscar avaliações';
        
        return{
            success: false,
            error: errorMessage
        };
    }
}

export async function removeRating(
    movieId:number
): Promise<RatingResult> {
    try {
        const response = await ratingAPI.delete(movieId);
        return {
            success: true,
            data: response.data
        };
    }catch (error: any) {
        const errorMessage =
            error.response?.data?.error ||
            'Erro ao remover avaliação';

        return {
            success: false,
            error: errorMessage
        };
    }
    
}