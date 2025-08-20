import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [val, setVal] = useState('');
  const navigate = useNavigate();

  const BEARER_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MDhkN2I5ODkwODZkNTcxYzk1ZjJjM2RhOTczODhlOCIsIm5iZiI6MTc1NTY1OTg3Ny4yMDQsInN1YiI6IjY4YTUzZTY1YWU5MzBlM2E0NWZkMjQyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e7sTuxGSTa4hV5kHP6xC26j2ITUpmiw-NwKDbuQkHow';

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const res = await axios.get(
          'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc',
          {
            headers: {
              Authorization: BEARER_TOKEN,
              accept: 'Homelication/json',
            },
          }
        );

        setTrending(res.data.results);
        //console.log(res.data.results); 
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchTrendingMovies();
  }, []);

  const fetchMovie = async (val) => {
    try {
      const res = await axios.get(
        'https://api.themoviedb.org/3/search/movie',
        {
          headers: {
            Authorization: BEARER_TOKEN,
            accept: 'Homelication/json',
          },
          params: {
            query: val,
          },
        }
      );

      //console.log(res.data.results)
      const exactMatch = res.data.results.filter(
        (i) => i.title.toLowerCase() === val.toLowerCase()
      );

      navigate('/search', { state: { movies: exactMatch } });
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white p-6 md:p-10 font-sans">
        {/* Search Bar */}
        <div className="flex items-center gap-2 mb-6">
          <input
            type="text"
            placeholder="Search movies..."
            className="p-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={val}
            onChange={(e) => {
              setVal(e.target.value);
            }}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
            onClick={() => fetchMovie(val)}
          >
            Search
          </button>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold mb-6 text-center text-blue-400">Trending Movies</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 justify-items-center">
          {trending.map((item, idx) => (
            <div
              key={item.id}
              className="flex flex-col bg-gray-800 rounded-xl shadow-2xl p-4 w-full h-auto transform transition-all duration-300 hover:scale-105 hover:shadow-blue-500/30 cursor-pointer"
              onClick={() => navigate(`/details/${item.id}`, { state: { movie: item } })}
            >
              {/* Movie Poster */}
              <img
                src={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : 'https://placehold.co/500x750/1f2937/d1d5db?text=No+Image'}
                alt={item.title}
                className="w-full h-auto rounded-lg mb-4 object-cover object-center shadow-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/500x750/1f2937/d1d5db?text=No+Image';
                }}
              />
              <div className="flex flex-col flex-grow">
                {/* Movie Title */}
                <h2 className="text-lg md:text-xl font-bold mb-1 line-clamp-2">
                  {item.title}
                </h2>
                {/* Release Date */}
                <p className="text-sm text-gray-400">
                  {item.release_date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
