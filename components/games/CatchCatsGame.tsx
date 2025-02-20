"use client"

import type React from "react"
import { useState, useEffect } from "react"

interface CatchCatsGameProps {
  onComplete: (success: boolean) => void
  onPlayMusic: () => void
}

const CatchCatsGame: React.FC<CatchCatsGameProps> = ({ onComplete, onPlayMusic }) => {
  const [caughtCats, setCaughtCats] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [showUnlocked, setShowUnlocked] = useState(false)
  const [gameOver, setGameOver] = useState(false)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (!gameOver) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1)
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [gameOver])

  useEffect(() => {
    if (timeLeft === 0 || caughtCats === 10) {
      setGameOver(true)
      if (caughtCats === 10) {
        setShowUnlocked(true)
        setTimeout(() => {
          onComplete(true)
        }, 3000)
      } else {
        onComplete(false)
      }
    }
  }, [timeLeft, caughtCats, onComplete])

  const handleCatchCat = () => {
    onPlayMusic()
    if (!gameOver) {
      setCaughtCats((prev) => prev + 1)
    }
  }

  const restartGame = () => {
    setCaughtCats(0)
    setTimeLeft(30)
    setGameOver(false)
    setShowUnlocked(false)
  }

  return (
    <div className="text-center relative h-screen flex flex-col justify-center items-center">
      <h3 className="text-3xl mb-6 text-orange-200">Catch 10 Falling Cats</h3>
      <p className="text-white mb-4 text-xl">
        Time left: {timeLeft}s | Cats caught: {caughtCats}/10
      </p>
      <div className="relative w-full h-[60vh] overflow-hidden">
        {!gameOver && (
          <>
            {[...Array(20)].map((_, index) => (
              <div
                key={index}
                className="absolute animate-fall cursor-pointer text-6xl"
                style={{
                  left: `${Math.random() * 90}%`,
                  top: `${Math.random() * 100}%`,
                  animationDuration: `${Math.random() * 2 + 3}s`,
                  animationDelay: `${Math.random() * 2}s`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
                onClick={handleCatchCat}
              >
                🐱
              </div>
            ))}
          </>
        )}
      </div>
      {showUnlocked && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-orange-500 p-12 rounded-3xl max-w-3xl w-full text-center">
            <p className="mb-8 text-4xl text-white font-bold">REWARD UNLOCKED:</p>
            <div className="relative w-full h-96">
              {[...Array(50)].map((_, index) => (
                <span
                  key={index}
                  className="absolute inline-block animate-pulse text-6xl"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    right: `${Math.random() * 100}%`,
                    bottom: `${Math.random() * 100}%`,
                    animationDuration: `${Math.random() * 2 + 1}s`,
                    animationDelay: `${Math.random() * 2}s`,
                    transform: `rotate(${Math.random() * 360}deg)`,
                  }}
                >
                  💋
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
      {gameOver && !showUnlocked && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="text-white text-2xl bg-orange-500 p-8 rounded-2xl">
            <p className="mb-4">Game Over! Try again to catch all 10 cats.</p>
            <button
              onClick={restartGame}
              className="px-6 py-3 bg-orange-600 text-white rounded-full text-xl hover:bg-orange-700 transition-colors duration-300"
            >
              Restart
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CatchCatsGame

