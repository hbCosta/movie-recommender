interface User {
    id: string;
    name: string;
    email: string;
    createdAt: string;
}

interface LoginCredentials {
    email: string;
    password: string;
}

interface RegisterData {
    name: string;
    email: string;
    password: string;
}

interface AuthResponse {
    user: User;
    accessToken: string;
}



interface Movie {
    id: number;
    tmdbId: number;
    title: string;
}

interface MovieDetails extends Movie {
    overview?: string;
    posterPath?: string;
    backdropPath: string;
    releaseDate?: string;
    voteAverage?: number;
    genres?: Genre[];
    runtime?: number;
}

interface Genre{
    id: number;
    name: string;
}

interface Rating {
    id: string;
    userId: string;
    movieId: string;
    rating: number;
    createdAt: string;
}

interface RatingWithMovie extends Rating {
    movie: Movie;
}

interface RatingWithUser extends Rating {
    user: User;
}

interface CreateRatingDto{
    movieId: string;
    rating: number;
}

interface ApiError {
    message: string;
    statusCode: number;
}


export type {
  // Auth
  User,
  LoginCredentials,
  RegisterData,
  AuthResponse,
  // Movies
  Movie,
  MovieDetails,
  Genre,
  // Ratings
  Rating,
  RatingWithMovie,
  RatingWithUser,
  CreateRatingDto,
  // Utils
  ApiError,
};