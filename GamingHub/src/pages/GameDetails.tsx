import { motion } from 'framer-motion'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import gamesData from '../data/games.json'

type Game = {
  id: number
  title: string
  genre: string
  rating: number
  image: string
}

type DetailContent = {
  summary: string
  studio: string
  releaseYear: number
  platforms: string[]
  tags: string[]
  review: string
}

const gameDetailsContent: Record<number, DetailContent> = {
  1: {
    summary: 'A vast fantasy action RPG built around discovery, punishing combat, and unforgettable boss encounters across the shattered Lands Between.',
    studio: 'FromSoftware',
    releaseYear: 2022,
    platforms: ['PC', 'PlayStation', 'Xbox'],
    tags: ['Open World', 'Soulslike', 'Exploration'],
    review: 'A demanding but deeply rewarding world that keeps paying off every time you wander off the main path.'
  },
  2: {
    summary: 'Kratos and Atreus push deeper into mythic realms in a cinematic combat adventure packed with emotional stakes and spectacular set pieces.',
    studio: 'Santa Monica Studio',
    releaseYear: 2022,
    platforms: ['PC', 'PlayStation'],
    tags: ['Story Rich', 'Mythology', 'Combat'],
    review: 'Big-budget spectacle with strong character writing and some of the most polished action encounters in the genre.'
  },
  3: {
    summary: 'A fast, replayable roguelike where every escape attempt from the Underworld sharpens your build knowledge and unlocks new story beats.',
    studio: 'Supergiant Games',
    releaseYear: 2020,
    platforms: ['PC', 'PlayStation', 'Xbox', 'Switch'],
    tags: ['Roguelike', 'Fast-Paced', 'Replayable'],
    review: 'One of the easiest roguelikes to love thanks to its smooth combat loop and constant sense of momentum.'
  },
  4: {
    summary: 'An expansive arcade racing festival set in Mexico with gorgeous environments, fast progression, and a huge stable of cars.',
    studio: 'Playground Games',
    releaseYear: 2021,
    platforms: ['PC', 'Xbox'],
    tags: ['Racing', 'Open World', 'Cars'],
    review: 'The map is beautiful, the handling is approachable, and nearly every race feels like a celebration.'
  },
  5: {
    summary: 'A sandbox phenomenon where building, survival, exploration, and creativity all coexist in a world that is as calm or chaotic as you make it.',
    studio: 'Mojang Studios',
    releaseYear: 2011,
    platforms: ['PC', 'PlayStation', 'Xbox', 'Switch', 'Mobile'],
    tags: ['Creative', 'Survival', 'Crafting'],
    review: 'Few games are this flexible; it works equally well as a cozy builder, a survival sandbox, or a group hangout.'
  },
  6: {
    summary: 'A tactical hero shooter centered on precise gunplay, ability timing, and team coordination across tightly designed competitive maps.',
    studio: 'Riot Games',
    releaseYear: 2020,
    platforms: ['PC'],
    tags: ['FPS', 'Competitive', 'Tactical'],
    review: 'The clean shooting model and sharp round structure make every clutch moment feel high stakes.'
  },
  7: {
    summary: 'A futuristic open-world RPG that mixes neon-drenched city exploration with hacking, combat builds, and story-driven missions.',
    studio: 'CD Projekt Red',
    releaseYear: 2020,
    platforms: ['PC', 'PlayStation', 'Xbox'],
    tags: ['Sci-Fi', 'Open World', 'Narrative'],
    review: 'Night City does the heavy lifting here: dense atmosphere, memorable side stories, and a strong sense of place.'
  },
  8: {
    summary: 'A sprawling western epic that blends cinematic storytelling with slow-burn immersion, detailed systems, and a massive frontier to roam.',
    studio: 'Rockstar Games',
    releaseYear: 2018,
    platforms: ['PC', 'PlayStation', 'Xbox'],
    tags: ['Western', 'Open World', 'Story Rich'],
    review: 'Methodical pacing will not be for everyone, but the world-building is still among the strongest in modern games.'
  },
  9: {
    summary: 'A party-based CRPG full of reactive storytelling, tactical combat, and a huge number of ways to solve encounters.',
    studio: 'Larian Studios',
    releaseYear: 2023,
    platforms: ['PC', 'PlayStation', 'Xbox'],
    tags: ['CRPG', 'Choices Matter', 'Turn-Based'],
    review: 'The freedom is the star: experimentation feels encouraged instead of merely allowed.'
  },
  10: {
    summary: 'A demanding action adventure driven by posture-based sword combat, aggressive boss fights, and a sharp focus on mastery.',
    studio: 'FromSoftware',
    releaseYear: 2019,
    platforms: ['PC', 'PlayStation', 'Xbox'],
    tags: ['Samurai', 'Soulslike', 'Precision'],
    review: 'Every win feels earned, and the combat system is focused enough to stay thrilling from start to finish.'
  },
  11: {
    summary: 'A richly written fantasy RPG with monster contracts, branching stories, and one of the genre’s most beloved open worlds.',
    studio: 'CD Projekt Red',
    releaseYear: 2015,
    platforms: ['PC', 'PlayStation', 'Xbox', 'Switch'],
    tags: ['Fantasy', 'Open World', 'Quests'],
    review: 'The side quests are still the benchmark: smart, human, and rarely treated like filler.'
  },
  12: {
    summary: 'A survival horror remake that balances tension, action, and polished encounter design with a constant sense of pressure.',
    studio: 'Capcom',
    releaseYear: 2023,
    platforms: ['PC', 'PlayStation', 'Xbox'],
    tags: ['Horror', 'Action', 'Remake'],
    review: 'Great pacing and excellent moment-to-moment combat keep it tense even after the first few hours.'
  },
  13: {
    summary: 'A moody action-platformer with intricate world design, tough boss fights, and exploration that rewards patience and curiosity.',
    studio: 'Team Cherry',
    releaseYear: 2017,
    platforms: ['PC', 'PlayStation', 'Xbox', 'Switch'],
    tags: ['Metroidvania', 'Atmospheric', 'Exploration'],
    review: 'Its world map unfolds with incredible elegance, making every shortcut and secret feel meaningful.'
  },
  14: {
    summary: 'A cozy farming and life sim where tending crops, building relationships, and shaping your routine become the real progression.',
    studio: 'ConcernedApe',
    releaseYear: 2016,
    platforms: ['PC', 'PlayStation', 'Xbox', 'Switch', 'Mobile'],
    tags: ['Cozy', 'Farming', 'Life Sim'],
    review: 'A low-stress classic that turns simple daily routines into something surprisingly hard to put down.'
  },
  15: {
    summary: 'A squad-based battle royale with hero abilities, fast movement, and a ping system built for high-clarity teamwork.',
    studio: 'Respawn Entertainment',
    releaseYear: 2019,
    platforms: ['PC', 'PlayStation', 'Xbox', 'Switch'],
    tags: ['Battle Royale', 'Teamplay', 'Movement'],
    review: 'The movement system gives firefights a distinct identity and keeps the genre feeling fresh.'
  },
  16: {
    summary: 'A cooperative action RPG focused on giant creature hunts, gear progression, and learning enemy behavior over time.',
    studio: 'Capcom',
    releaseYear: 2018,
    platforms: ['PC', 'PlayStation', 'Xbox'],
    tags: ['Co-op', 'Boss Hunts', 'Loot'],
    review: 'The loop of studying monsters, crafting better gear, and taking on harder fights is extremely satisfying.'
  }
}

const fallbackDetails: DetailContent = {
  summary: 'A standout title in the collection with a strong genre identity and a high player rating.',
  studio: 'Featured Studio',
  releaseYear: 2024,
  platforms: ['PC'],
  tags: ['Featured', 'Trending', 'Community Pick'],
  review: 'A polished pick from the hub with plenty of replay appeal and a strong overall reception.'
}

const GameDetails = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const gameFromState = location.state?.data as Game | undefined
  const selectedGame = gameFromState ?? (gamesData.games[0] as Game | undefined)

  if (!selectedGame) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#07111f] px-4 text-white">
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl">
          <p className="text-lg font-semibold">Game not found.</p>
          <Link
            to="/"
            className="mt-4 inline-flex rounded-2xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950"
          >
            Back to Library
          </Link>
        </div>
      </div>
    )
  }

  const detailContent = gameDetailsContent[selectedGame.id] ?? fallbackDetails
  const relatedGames = (gamesData.games as Game[])
    .filter((item) => item.genre === selectedGame.genre && item.id !== selectedGame.id)
    .slice(0, 3)

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07111f] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="gaming-orb gaming-orb-left" />
        <div className="gaming-orb gaming-orb-right" />
        <div className="gaming-grid" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:border-cyan-400/40 hover:text-cyan-200"
          >
            Back
          </button>

          <Link
            to="/"
            className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/20"
          >
            Browse More Games
          </Link>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-[32px] border border-white/10 bg-white/5 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="relative min-h-[320px] overflow-hidden">
              <img
                src={selectedGame.image}
                alt={selectedGame.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#07111f] via-[#07111f]/35 to-transparent lg:bg-gradient-to-t lg:from-[#07111f] lg:via-[#07111f]/15 lg:to-transparent" />
            </div>

            <div className="relative flex flex-col justify-between p-6 sm:p-8">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300/80">
                  Game Overview
                </p>
                <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
                  {selectedGame.title}
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                  {detailContent.summary}
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-[24px] border border-white/10 bg-[#0d1a2b]/90 p-4">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400">Genre</p>
                  <p className="mt-3 text-sm font-semibold text-white">{selectedGame.genre}</p>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-[#0d1a2b]/90 p-4">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400">Rating</p>
                  <p className="mt-3 text-sm font-semibold text-amber-300">{selectedGame.rating} / 5</p>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-[#0d1a2b]/90 p-4">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400">Studio</p>
                  <p className="mt-3 text-sm font-semibold text-white">{detailContent.studio}</p>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-[#0d1a2b]/90 p-4">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400">Released</p>
                  <p className="mt-3 text-sm font-semibold text-white">{detailContent.releaseYear}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.55 }}
            className="rounded-[30px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/75">
              Player Snapshot
            </p>
            <p className="mt-4 text-lg font-semibold text-white">
              {detailContent.review}
            </p>

            <div className="mt-6">
              <p className="text-sm font-semibold text-slate-300">Available On</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {detailContent.platforms.map((platform) => (
                  <span
                    key={platform}
                    className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100"
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm font-semibold text-slate-300">Top Tags</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {detailContent.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-[#0d1a2b] px-4 py-2 text-sm text-slate-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.55 }}
            className="rounded-[30px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/75">
                More Like This
              </p>
              <h2 className="mt-2 text-2xl font-bold text-white">Related picks from the hub</h2>
            </div>

            <div className="mt-6 grid gap-4">
              {relatedGames.length > 0 ? (
                relatedGames.map((game) => (
                  <button
                    key={game.id}
                    type="button"
                    onClick={() => navigate('/details', { state: { data: game } })}
                    className="flex items-center gap-4 rounded-[24px] border border-white/10 bg-[#0d1a2b]/90 p-4 text-left transition hover:border-cyan-400/30"
                  >
                    <img
                      src={game.image}
                      alt={game.title}
                      className="h-20 w-32 rounded-2xl object-cover"
                    />
                    <div className="min-w-0">
                      <p className="text-lg font-semibold text-white">{game.title}</p>
                      <p className="mt-1 text-sm text-slate-400">{game.genre}</p>
                      <p className="mt-2 text-sm text-amber-300">Rating {game.rating} / 5</p>
                    </div>
                  </button>
                ))
              ) : (
                <div className="rounded-[24px] border border-dashed border-white/15 bg-[#0d1a2b]/70 p-5 text-sm text-slate-300">
                  No same-genre matches yet, but the full library is one click away.
                </div>
              )}
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  )
}

export default GameDetails
