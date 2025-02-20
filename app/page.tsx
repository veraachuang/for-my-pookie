"use client"

import { useState, useEffect } from "react"
import { Howl } from "howler"
import { Playfair_Display, Dancing_Script } from "next/font/google"
import BackgroundScene from "../components/BackgroundScene"
import TitleScreen from "../components/TitleScreen"
import GameContainer from "../components/GameContainer"
import PauseMusicButton from "../components/PauseMusicButton"

const playfair = Playfair_Display({ subsets: ["latin"] })
const dancingScript = Dancing_Script({ subsets: ["latin"] })

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [sound, setSound] = useState<Howl | null>(null)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)

  useEffect(() => {
    const newSound = new Howl({
      src: ["/versace-on-the-floor.mp3"],
      loop: true,
      volume: 0.5,
      onload: () => {
        setSound(newSound)
        setTimeout(() => setIsLoaded(true), 1000) // Delay to allow for initial black screen
      },
    })

    return () => {
      if (newSound) {
        newSound.unload()
      }
    }
  }, [])

  const startGame = () => {
    setGameStarted(true)
    if (sound) {
      sound.play()
      setIsMusicPlaying(true)
    }
  }

  const handlePlayMusic = () => {
    if (sound && !sound.playing()) {
      sound.play()
      setIsMusicPlaying(true)
    }
  }

  const toggleMusic = () => {
    if (sound) {
      if (sound.playing()) {
        sound.pause()
        setIsMusicPlaying(false)
      } else {
        sound.play()
        setIsMusicPlaying(true)
      }
    }
  }

  return (
    <main className={`h-screen overflow-hidden ${playfair.className}`}>
      <div className={`transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        <BackgroundScene />
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
        <div className="relative z-20">
          {!gameStarted ? (
            <TitleScreen onStart={startGame} dancingScript={dancingScript} />
          ) : (
            <GameContainer onPlayMusic={handlePlayMusic} dancingScript={dancingScript} />
          )}
        </div>
        <PauseMusicButton isPlaying={isMusicPlaying} onToggle={toggleMusic} />
      </div>
    </main>
  )
}

