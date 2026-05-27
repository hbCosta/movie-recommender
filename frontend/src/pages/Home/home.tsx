import { useEffect, useRef, useState } from "react";

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

    const carouselRef = useRef<HTMLDivElement>(null);

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

    const handleScrollLeft = () => {
        if(carouselRef.current){
            carouselRef.current.scrollBy({left: -300, behavior: "smooth"});
        }
    }
    const handleScrollRight = () => {
        if(carouselRef.current){
            carouselRef.current.scrollBy({left: 300, behavior: "smooth"});
        }
    }

    if(loading){
        return <div className="text-white p-4">Carregando filmes...</div>
    }

    if(error){
        return <div className="text-red-500 p-4">{error}</div>
    }
    return(
        
        <div className="relative w-full px-10 py-8 group bg-[#0f0f0f] min-h-screen">
            <div mb-4 px-1>
                <h2 className="text-white text-3xl font-extrabold trackng-wide">
                    Filmes em Alta
                </h2>
                
                <p className="text-gray-400 text-sm mt-1">
                    Os títulos mais assistidos do momento
                </p>
            </div>
            <button 
                onClick={handleScrollLeft}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 z-10 rounded-r-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" >                        
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>
            
            <div ref={carouselRef}
                className="flex overflow-x-auto gap-6 snap-x snap-mandatory py-4 
                scroll-smooth
                [scrollbar-width:none] 
                [-ms-overflow-style:none] 
                [&::-webkit-scrollbar]:hidden"
            >
                {movies.map((movie)=> (
                    <div
                    key={movie.id}
                    className="
                    relative flex-none w-64 h-96 rounded-2xl overflow-hidden
                    snap-center cursor-pointer group/item 
                    transition-all duration-300  hover:scale-105 hover:z-20 "
                    >
                    <img 
                            src={`http://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                            alt={movie.title}
                            className="
                            w-full h-full object-cover
                            transition-transform duration-500
                            group-hover/item:scale-110" 
                    />
                    <div
                        className="
                        absolute inset-0
                        bg-gradient-to-t from-black via-black/30 to-transparent
                        "
                    />
                    
                    </div>

                ))}

            </div>

            <button
                onClick={handleScrollRight}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 z-10 rounded-l-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"            
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
            </button>
        </div>
    )
}
export default Home;
