import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const movies = location?.state?.movies;

  if (!movies || movies.length === 0) {
    return <div className="text-white text-center mt-10">No movie details available.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 md:p-10 font-sans">
      <h1 className="text-3xl md:text-5xl font-extrabold mb-6 text-center text-blue-400">Search Results</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 justify-items-center">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="flex flex-col bg-gray-800 rounded-xl shadow-2xl p-4 w-full h-auto transform transition-all duration-300 hover:scale-105 hover:shadow-blue-500/30 cursor-pointer"
            onClick={() => navigate(`/details/${movie.id}`, { state: { movie } })}
          >
            <img
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://placehold.co/500x750/1f2937/d1d5db?text=No+Image'}
              alt={movie.title}
              className="w-full h-auto rounded-lg mb-4 object-cover object-center shadow-lg"
            />
            <h2 className="text-lg md:text-xl font-bold mb-1 line-clamp-2">{movie.title}</h2>
            <p className="text-sm text-gray-400">{movie.release_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchDetails;
