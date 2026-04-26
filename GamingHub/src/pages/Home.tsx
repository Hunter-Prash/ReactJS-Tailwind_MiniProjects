import React, { useState } from 'react'
import gamesData from '../data/games.json'

const Home = () => {

    type Game = {
        id: number;
        title: string;
        genre: string;
        rating: number;
        image: string;
    };
    const [games, setGames] = useState<Game[]>(gamesData.games)

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">
                🎮 PC Gaming Hub
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {games.map((item) => (
                    <div
                        key={item.id}
                        className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
                    >
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-40 object-cover"
                        />

                        <div className="p-4">
                            <h2 className="text-lg font-semibold">{item.title}</h2>

                            <p className="text-sm text-gray-400">{item.genre}</p>

                            <p className="mt-2 text-yellow-400 font-medium">
                                ⭐ {item.rating}
                            </p>

                            <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg transition">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home
