import { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    overview?: string;
    vote_average?: number;
}

const Home: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const[loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const token = localStorage.getItem('token');
                if(!token){
                    setError('Você precisa estar logado');
                    setLoading(false);
                    return;
                }
                
                const response = await fetch('http://localhost:3000/api/movies/popular?page=1',{
                    headers:{
                        'Authorization': `Bearer ${token}`,
                        'Content-type': 'application/json'
                    }
                });
                
                if(!response.ok){
                    throw new Error('Erro ao buscar filmes');
                }
                
                const data = await response.json();
                setMovies(data.results);
                setLoading(false);
            }catch(err){
                console.error('Erro: ', err);
                setError('Erro ao carregar filmes');
                setLoading(false);
            }
        };
        fetchMovies();
    }, []);

    if(loading){
        return <div className="text-white p-4">Carregando filmes...</div>
    }

    if(error){
        return <div className="text-red-500 p-4">{error}</div>
    }
    return(
        <div className="flex overflow-x-auto gap-4 p-4 scrollbar-hide snap-x snap-mandatory">
            {movies.map((movie)=>(
                <div
                    key={movie.id}
                    className="flex-none w-64 h-80 bg-[#2a2a2a] rounded-2xl shadow-xl snap-center
                    border border-white overflow-hidden"
                >
                    <img 
                        src={`http://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                        alt={movie.title}
                        className="w-full h-full object-cover" />

                </div>
                
            ))}
        </div>
    )
}
export default Home;
