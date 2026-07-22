import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import {
    rateMovie,
    removeRating,
    getUserRatings
} from '../../services/rating.service'
import { movieAPI } from '../../services/api';

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    overview?: string;
    vote_average?: number;
}

interface MovieRowProps {
    title: string;
    subtitle: string;
    movies: Movie[];
    ratings: Record<number, number>;
    onRate: (movieId: number, star: number) => void;
    emptyMessage?: string;
}

const MovieRow: React.FC<MovieRowProps> = ({ title, subtitle, movies, ratings, onRate, emptyMessage }) => {
    const carouselRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: number) => {
        carouselRef.current?.scrollBy({ left: direction * 300, behavior: "smooth" });
    };

    if (movies.length === 0) {
        if (!emptyMessage) return null;
        return (
            <div className="w-full mb-10 px-1">
                <h2 className="text-white text-3xl font-extrabold tracking-wide">{title}</h2>
                <p className="text-gray-400 text-sm mt-1">{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className="relative w-full mb-10 group">
            <div className="mb-4 px-1">
                <h2 className="text-white text-3xl font-extrabold tracking-wide">{title}</h2>
                <p className="text-gray-400 text-sm mt-1">{subtitle}</p>
            </div>

            <button
                onClick={() => scroll(-1)}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 z-10 rounded-r-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>

            <div
                ref={carouselRef}
                className="flex overflow-x-auto gap-6 snap-x snap-mandatory py-4
                scroll-smooth
                [scrollbar-width:none]
                [-ms-overflow-style:none]
                [&::-webkit-scrollbar]:hidden"
            >
                {movies.map((movie) => (
                    <div
                        key={movie.id}
                        className="
                        relative flex-none w-64 h-96 rounded-2xl overflow-hidden
                        snap-center cursor-pointer group/item
                        transition-all duration-300 hover:scale-105 hover:z-20"
                    >
                        <img
                            src={`http://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                        <div className="absolute top-3 right-3 z-20 flex gap-0.5 bg-black/60 rounded-full px-2 py-1.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onRate(movie.id, star);
                                    }}
                                    className="p-0.5"
                                >
                                    <Star
                                        className={`w-4 h-4 ${
                                            star <= (ratings[movie.id] || 0)
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "text-white"
                                        }`}
                                    />
                                </button>
                            ))}
                        </div>

                        <div className="absolute bottom-3 left-3 right-3 z-10">
                            <p className="text-white text-sm font-semibold line-clamp-2">{movie.title}</p>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={() => scroll(1)}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 z-10 rounded-l-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </button>
        </div>
    );
};

const Home: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [recommendations, setRecommendations] = useState<Movie[]>([]);
    const [ratings, setRatings] = useState<Record<number, number>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('Você precisa estar logado');
                    setLoading(false);
                    return;
                }

                const response = await movieAPI.getPopular();
                setMovies(response.data.results);

                try {
                    const recommendationsResponse = await movieAPI.getRecommendations();
                    setRecommendations(recommendationsResponse.data.results || []);
                } catch (recError) {
                    console.error('Erro ao buscar recomendações:', recError);
                }

                const ratingsResult = await getUserRatings();
                if (ratingsResult.success && Array.isArray(ratingsResult.data)) {
                    const ratingsMap: Record<number, number> = {};
                    ratingsResult.data.forEach((r: any) => {
                        ratingsMap[r.movie.tmdbId] = r.rating;
                    });
                    setRatings(ratingsMap);
                }

                setLoading(false);
            } catch (err) {
                console.error('Erro: ', err);
                setError('Erro ao carregar filmes');
                setLoading(false);
            }
        };
        fetchMovies();
    }, []);

    const handleRate = async (movieId: number, star: number) => {
        const isSameRating = ratings[movieId] === star;

        if (isSameRating) {
            const result = await removeRating(movieId);
            if (result.success) {
                setRatings((prev) => {
                    const next = { ...prev };
                    delete next[movieId];
                    return next;
                });
            }
        } else {
            const result = await rateMovie(movieId, star);
            if (result.success) {
                setRatings((prev) => ({ ...prev, [movieId]: star }));
            }
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (loading) {
        return <div className="text-white p-4">Carregando filmes...</div>;
    }

    if (error) {
        return <div className="text-red-500 p-4">{error}</div>;
    }

    return (
        <div className="w-full px-10 py-8 bg-[#0f0f0f] min-h-screen">
            <div className="flex justify-end mb-4">
                <button
                    onClick={handleLogout}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                    Sair
                </button>
            </div>

            <MovieRow
                title="Recomendados para você"
                subtitle="Baseado nos filmes que você mais gostou"
                movies={recommendations}
                ratings={ratings}
                onRate={handleRate}
                emptyMessage="Avalie alguns filmes com estrelas para receber recomendações personalizadas."
            />

            <MovieRow
                title="Filmes em Alta"
                subtitle="Os títulos mais assistidos do momento"
                movies={movies}
                ratings={ratings}
                onRate={handleRate}
            />
        </div>
    );
};

export default Home;
