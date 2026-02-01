import { useState, useEffect, useCallback } from 'react'

interface Seller {
  id: string
  wallet: string
  amount: number
  timestamp: Date
  roastMessage: string
}

const ROAST_MESSAGES = [
  "PAPER HANDS DETECTED! 📄🙌",
  "NGMI ENERGY RIGHT HERE! 💀",
  "SELLING THE BOTTOM? CLASSIC! 🤡",
  "THANKS FOR THE CHEAP BAGS! 🛍️",
  "WEAK HANDS = WEAK GAINS! 📉",
  "JEEEEETED! BYE BYE! 👋😂",
  "SOLD? WE'LL SEND A POSTCARD FROM THE MOON! 🌙",
  "IMAGINE SELLING HERE LMAOOO! 🤣🤣",
  "PAPER HAND PETE STRIKES AGAIN! 📜",
  "NGMI SPEEDRUN ANY%! 🏃💨",
  "SOLD FOR A SANDWICH? WORTH IT? 🥪",
  "TOILET PAPER HANDS ACTIVATED! 🧻",
  "PANIC SOLD? THAT'S GONNA HURT! 😬",
  "WEAKHANDED WARRIOR RETREATS! ⚔️🏳️",
  "ANOTHER ONE BITES THE DUST! 💀🎵",
]

const LAUGH_EMOJIS = ['🤣', '😂', '😹', '🤪', '😆', '💀', '☠️', '🫵', '👉', '🤡']

const generateWallet = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789'
  let result = ''
  for (let i = 0; i < 44; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

const generateSeller = (): Seller => ({
  id: Math.random().toString(36).substr(2, 9),
  wallet: generateWallet(),
  amount: Math.floor(Math.random() * 1000000000) + 10000,
  timestamp: new Date(),
  roastMessage: ROAST_MESSAGES[Math.floor(Math.random() * ROAST_MESSAGES.length)],
})

interface EmojiRain {
  id: string
  emoji: string
  left: number
  duration: number
  delay: number
}

function App() {
  const [sellers, setSellers] = useState<Seller[]>([])
  const [emojiRain, setEmojiRain] = useState<EmojiRain[]>([])
  const [totalJeeters, setTotalJeeters] = useState(0)
  const [totalVolume, setTotalVolume] = useState(0)

  const spawnEmoji = useCallback(() => {
    const newEmoji: EmojiRain = {
      id: Math.random().toString(36).substr(2, 9),
      emoji: LAUGH_EMOJIS[Math.floor(Math.random() * LAUGH_EMOJIS.length)],
      left: Math.random() * 100,
      duration: 3 + Math.random() * 4,
      delay: 0,
    }
    setEmojiRain(prev => [...prev.slice(-20), newEmoji])
  }, [])

  useEffect(() => {
    const initialSellers = Array.from({ length: 5 }, generateSeller)
    setSellers(initialSellers)
    setTotalJeeters(initialSellers.length)
    setTotalVolume(initialSellers.reduce((acc, s) => acc + s.amount, 0))

    const sellerInterval = setInterval(() => {
      const newSeller = generateSeller()
      setSellers(prev => [newSeller, ...prev.slice(0, 19)])
      setTotalJeeters(prev => prev + 1)
      setTotalVolume(prev => prev + newSeller.amount)
      for (let i = 0; i < 5; i++) {
        setTimeout(() => spawnEmoji(), i * 100)
      }
    }, 2000 + Math.random() * 3000)

    const emojiInterval = setInterval(spawnEmoji, 500)

    return () => {
      clearInterval(sellerInterval)
      clearInterval(emojiInterval)
    }
  }, [spawnEmoji])

  const formatAmount = (amount: number) => {
    if (amount >= 1000000000) return `${(amount / 1000000000).toFixed(2)}B`
    if (amount >= 1000000) return `${(amount / 1000000).toFixed(2)}M`
    if (amount >= 1000) return `${(amount / 1000).toFixed(2)}K`
    return amount.toString()
  }

  const truncateWallet = (wallet: string) => `${wallet.slice(0, 6)}...${wallet.slice(-4)}`

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#1a0a20] to-[#0a0a0f] relative">
      {/* Emoji Rain */}
      {emojiRain.map(emoji => (
        <span
          key={emoji.id}
          className="emoji-rain"
          style={{
            left: `${emoji.left}%`,
            animationDuration: `${emoji.duration}s`,
            animationDelay: `${emoji.delay}s`,
          }}
        >
          {emoji.emoji}
        </span>
      ))}

      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, #ff3c3c 0, #ff3c3c 1px, transparent 1px, transparent 50px),
                           repeating-linear-gradient(-45deg, #ffe600 0, #ffe600 1px, transparent 1px, transparent 50px)`,
        }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 flex flex-col min-h-screen">
        {/* Header */}
        <header className="text-center mb-8">
          {/* Floating Emojis Around Title */}
          <div className="relative inline-block">
            <span className="absolute -left-16 -top-4 text-5xl animate-float" style={{ animationDelay: '0s' }}>🤣</span>
            <span className="absolute -right-16 -top-4 text-5xl animate-float" style={{ animationDelay: '0.5s' }}>😂</span>
            <span className="absolute -left-20 top-12 text-4xl animate-float" style={{ animationDelay: '1s' }}>💀</span>
            <span className="absolute -right-20 top-12 text-4xl animate-float" style={{ animationDelay: '1.5s' }}>🤡</span>
            
            <h1 className="font-glitch text-6xl md:text-8xl text-yellow-400 animate-glitch tracking-wider mb-2">
              LMAO!
            </h1>
            <h2 className="font-dela text-4xl md:text-6xl text-red-500 neon-text tracking-widest">
              JEETERS
            </h2>
          </div>

          <p className="mt-6 text-xl md:text-2xl text-gray-300 font-bangers tracking-wide">
            LAUGHING AT PAPER HANDS IN REAL TIME 
            <span className="inline-block animate-shake ml-2">🫵😂</span>
          </p>

          {/* Token Address */}
          <div className="mt-4 inline-block bg-black/50 border border-yellow-500/50 rounded-xl px-6 py-3">
            <p className="text-xs text-yellow-500 mb-1 font-bold">WATCHING TOKEN:</p>
            <p className="text-yellow-400 font-mono text-xs md:text-sm break-all">
              H74CYmXgMkYHYuSRsZt6RJb4NYp2u72Vw8BS5huApump
            </p>
          </div>

          {/* X Link Button */}
          <div className="mt-6">
            <a
              href="https://x.com/dadonpump"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-black hover:bg-gray-900 text-white px-8 py-4 rounded-2xl border-2 border-gray-700 hover:border-yellow-500 transition-all duration-300 hover:scale-105 group"
            >
              <svg className="w-6 h-6 group-hover:text-yellow-400 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span className="font-dela text-lg">FOLLOW THE CHAOS</span>
              <span className="text-2xl group-hover:animate-shake">🤣</span>
            </a>
          </div>
        </header>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-red-900/50 to-red-950/50 border border-red-500/50 rounded-2xl p-4 text-center">
            <p className="text-red-400 font-bold text-sm mb-1">TOTAL JEETERS</p>
            <p className="text-3xl md:text-4xl font-dela text-white">{totalJeeters}</p>
            <span className="text-2xl">🤡</span>
          </div>
          <div className="bg-gradient-to-br from-yellow-900/50 to-yellow-950/50 border border-yellow-500/50 rounded-2xl p-4 text-center">
            <p className="text-yellow-400 font-bold text-sm mb-1">VOLUME JEETED</p>
            <p className="text-3xl md:text-4xl font-dela text-white">{formatAmount(totalVolume)}</p>
            <span className="text-2xl">💸</span>
          </div>
          <div className="col-span-2 md:col-span-1 bg-gradient-to-br from-green-900/50 to-green-950/50 border border-green-500/50 rounded-2xl p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <div className="live-badge px-2 py-0.5 rounded-full">
                <span className="text-white text-xs font-bold">● LIVE</span>
              </div>
            </div>
            <p className="text-green-400 font-bold text-lg">WATCHING 24/7</p>
            <span className="text-2xl">👀</span>
          </div>
        </div>

        {/* Live Feed */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <h3 className="font-bangers text-2xl md:text-3xl text-white tracking-wide">LIVE JEETER FEED</h3>
            <div className="flex gap-1">
              {['🤣', '😂', '💀'].map((emoji, i) => (
                <span key={i} className="text-2xl animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>
                  {emoji}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
            {sellers.map((seller, index) => (
              <div
                key={seller.id}
                className="card-glow rounded-2xl p-4 animate-slide-in backdrop-blur-sm"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl animate-bounce-in" style={{ animationDelay: '0.2s' }}>
                      {LAUGH_EMOJIS[Math.floor(Math.random() * LAUGH_EMOJIS.length)]}
                    </span>
                    <div>
                      <p className="font-mono text-yellow-400 text-sm md:text-base">
                        {truncateWallet(seller.wallet)}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {seller.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-red-400 font-dela text-lg md:text-xl">
                      -{formatAmount(seller.amount)}
                    </p>
                    <p className="text-red-600 text-xs font-bold">SOLD</p>
                  </div>
                </div>
                <div className="mt-3 bg-black/50 rounded-xl px-4 py-2">
                  <p className="font-bangers text-yellow-300 text-lg tracking-wide">
                    {seller.roastMessage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Action Emojis */}
        <div className="fixed bottom-24 right-4 flex flex-col gap-2">
          {['🤣', '💀', '🤡'].map((emoji, i) => (
            <button
              key={i}
              onClick={() => {
                for (let j = 0; j < 10; j++) {
                  setTimeout(() => spawnEmoji(), j * 50)
                }
              }}
              className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-red-500 rounded-full flex items-center justify-center text-2xl hover:scale-125 transition-transform animate-pulse-glow"
              style={{ animationDelay: `${i * 0.3}s` }}
            >
              {emoji}
            </button>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-gray-800/50 text-center">
          <p className="text-gray-600 text-xs">
            Requested by <a href="https://x.com/dadonpump" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-yellow-500 transition-colors">@dadonpump</a> · Built by <a href="https://x.com/clonkbot" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-yellow-500 transition-colors">@clonkbot</a>
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App