"use client"

import type React from "react"
import { useState } from "react"
import type { FontType } from "../types"
import CatchCatsGame from "./games/CatchCatsGame"
import MatchingGame from "./games/MatchingGame"
import FlappyBirdGame from "./games/FlappyBirdGame"
import LoveLetter from "./LoveLetter"

interface GameContainerProps {
  onPlayMusic: () => void
  dancingScript: FontType
}

const GameContainer: React.FC<GameContainerProps> = ({ onPlayMusic, dancingScript }) => {
  const [currentGame, setCurrentGame] = useState(0)
  const [showLoveLetter, setShowLoveLetter] = useState(false)

  const games = [
    { component: CatchCatsGame, title: "Catch the Cats" },
    { component: MatchingGame, title: "Match One Piece Characters" },
    { component: FlappyBirdGame, title: "Flappy Bird: Singapore to Seattle" },
  ]

  const handleGameComplete = (success: boolean) => {
    if (success) {
      if (currentGame < games.length - 1) {
        setCurrentGame(currentGame + 1)
      } else {
        setShowLoveLetter(true)
      }
    }
  }

  const CurrentGame = games[currentGame].component

  return (
    <div className="container mx-auto px-4 py-8">
      {!showLoveLetter ? (
        <>
          <h2 className={`text-4xl mb-6 text-center text-orange-300 ${dancingScript.className}`}>
            {games[currentGame].title}
          </h2>
          <CurrentGame onComplete={handleGameComplete} onPlayMusic={onPlayMusic} />
        </>
      ) : (
        <LoveLetter dancingScript={dancingScript} />
      )}
    </div>
  )
}

export default GameContainer

