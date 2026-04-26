import { useEffect, useState, type ChangeEvent, type MouseEvent } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import gamesData from '../data/games.json'

type Game = {
    id: number;
    title: string;
    genre: string;
    rating: number;
    image: string;
};

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.18
        }
    }
}

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 28,
        scale: 0.96
    },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.55
        }
    }
}

const Home = () => {
    const [games] = useState<Game[]>(gamesData.games as Game[])
    const navigate = useNavigate()
    const genres = ['All Genres', ...new Set(games.map((game) => game.genre))]

    const [genreGames, setGenreGames] = useState<Game[]>([])
    const [flag, setFlag] = useState<boolean>(false)
    const cartCount = 3

    const [search, setSearch] = useState<string>('')
    const [results, setResults] = useState<Game[]>([])

    const handleGenreClick = (e: ChangeEvent<HTMLSelectElement>) => {

        if (e.target.value.toLowerCase() === 'All genres'.toLowerCase()) {
            setFlag(true)
            setGenreGames(gamesData.games)

        }

        else {
            const temp = games.filter(i => (i.genre.toLowerCase() === e.target.value.toLowerCase()))
            setFlag(true)
            setGenreGames(temp)

        }
    }

    const handleClick = (e: MouseEvent<HTMLButtonElement>, item: Game) => {
        e.stopPropagation()//e.stopPropagation() stops the click event from bubbling up to parent elements.
    /*In your case, the Add to Cart button sits inside a clickable game card. Without e.stopPropagation(), clicking the button would also trigger the card’s onClick, which would navigate to /details.*/
        console.log(item)
    }

    //DEBOUNCING
    useEffect(() => {
        const timer = setTimeout(() => {
        const temp: Game[] = games.filter(i => (i.title.toLowerCase().includes(search.toLowerCase())))
            console.log(temp)
        setResults(temp)
        }, 500)

        return () => clearTimeout(timer)
    }, [search])

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#07111f] px-4 py-8 text-white sm:px-6 lg:px-8">
            <div className="pointer-events-none absolute inset-0">
                <div className="gaming-orb gaming-orb-left" />
                <div className="gaming-orb gaming-orb-right" />
                <div className="gaming-grid" />
            </div>

            <div className="relative mx-auto max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="mb-10 rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-8"
                >
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: 120 }}
                        transition={{ duration: 0.8, delay: 0.15 }}
                        className="mb-4 h-1 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500"
                    />

                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-3xl">
                            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300/80">
                                Discover Your Next Obsession
                            </p>
                            <h1 className="max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                                PC Gaming Hub
                            </h1>
                            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                                Curated hits, bold worlds, and high-rated favorites. Browse a sharper-looking library
                                with motion that feels a little more premium.
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.25, duration: 0.6 }}
                                className="inline-flex w-fit items-center gap-3 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100"
                            >
                                <span className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(103,232,249,0.9)]" />
                                <span>{games.length} Games Loaded</span>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.35, duration: 0.6 }}
                                className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm text-white backdrop-blur-md"
                            >
                                <span className="text-lg leading-none" aria-hidden="true">🛒</span>
                                <span>Cart</span>
                                <span className="rounded-full bg-cyan-400 px-2 py-0.5 text-xs font-bold text-slate-950">
                                    {cartCount}
                                </span>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                <div className="mb-8 grid grid-cols-1 gap-4 rounded-[28px] border border-white/10 bg-white/5 p-4 backdrop-blur-xl md:grid-cols-[220px_minmax(0,1fr)] md:p-5">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="genre-select" className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200/75">
                            Select Genre
                        </label>
                        <select
                            id="genre-select"
                            className="rounded-2xl border border-white/10 bg-[#0d1a2b] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50"
                            onChange={handleGenreClick}
                        >
                            {genres.map((genre) => (
                                <option key={genre} value={genre}>
                                    {genre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="game-search" className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200/75">
                            Search Games
                        </label>
                        <input
                            id="game-search"
                            type="text"
                            placeholder="Search by title, genre, or vibe..."
                            className="rounded-2xl border border-white/10 bg-[#0d1a2b] px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-400/50"
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                           
                        />
                    </div>
                    {/* Add this right after the search input's closing </div> */}
                    {search && results.length > 0 && (
                        <div className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0d1a2b] py-2 shadow-xl">
                            {results.map((item) => (
                                <div
                                    key={item.id}
                                    className="cursor-pointer px-4 py-2 text-sm text-white hover:bg-white/10"
                                    onClick={() => navigate('/details', { state: { data: item } })}
                                >
                                    {item.title}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4"
                >
                    {(flag ? genreGames : games).map((item) => (
                        <motion.article
                            key={item.id}
                            variants={cardVariants}
                            whileHover={{ y: -10 }}
                            onClick={() => navigate('/details', { state: { data: item } })}
                            className="group relative cursor-pointer overflow-hidden rounded-[28px] border border-white/8 bg-[#132033]/90 shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur-md"
                        >
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.03] via-transparent to-cyan-400/[0.06] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                            <div className="relative overflow-hidden">
                                <motion.img
                                    src={item.image}
                                    alt={item.title}
                                    loading="lazy"
                                    whileHover={{ scale: 1.08 }}
                                    transition={{ duration: 0.45, ease: 'easeOut' }}
                                    className="h-44 w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#132033] via-[#132033]/20 to-transparent" />

                                <motion.div
                                    initial={{ opacity: 0.55 }}
                                    whileHover={{ opacity: 0.95 }}
                                    className="absolute right-4 top-4 rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs font-semibold tracking-[0.2em] text-white backdrop-blur-md"
                                >
                                    #{item.id}
                                </motion.div>
                            </div>

                            <div className="relative p-5">
                                <div className="mb-5 flex items-start justify-between gap-4">
                                    <div>
                                        <h2 className="text-2xl font-bold tracking-tight text-white">{item.title}</h2>
                                        <p className="mt-1 text-sm text-slate-400">{item.genre}</p>
                                    </div>

                                    <div className="rounded-2xl border border-amber-300/20 bg-amber-300/10 px-3 py-2 text-center">
                                        <p className="text-[10px] uppercase tracking-[0.24em] text-amber-200/70">Score</p>
                                        <p className="text-lg font-bold text-amber-300">{item.rating}</p>
                                    </div>
                                </div>

                                <div className="mb-5 h-px bg-gradient-to-r from-cyan-400/40 via-white/10 to-transparent" />

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={(e) => handleClick(e, item)}
                                    className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 px-4 py-3 font-semibold text-white shadow-[0_10px_30px_rgba(37,99,235,0.35)] transition"
                                >
                                    Add to Cart
                                </motion.button>
                            </div>
                        </motion.article>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}

export default Home
