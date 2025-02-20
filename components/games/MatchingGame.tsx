"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"

interface MatchingGameProps {
  onComplete: (success: boolean) => void
  onPlayMusic: () => void
}

const onePieceCharacters = [
  { name: "Luffy", image: "/one-piece/luffy.jpg" },
  { name: "Zoro", image: "/one-piece/zoro.jpg" },
  { name: "Nami", image: "/one-piece/nami.JPG" },
  { name: "Usopp", image: "/one-piece/usopp.jpg" },
  { name: "Sanji", image: "/one-piece/sanji.jpg" },
  { name: "Chopper", image: "/one-piece/chopper.jpg" },
  { name: "Robin", image: "/one-piece/robin.jpg" },
  { name: "Franky", image: "/one-piece/franky.jpg" },
]

const MatchingGame: React.FC<MatchingGameProps> = ({ onComplete, onPlayMusic }) => {
  const [cards, setCards] = useState<{ name: string; image: string }[]>([])
  const [flipped, setFlipped] = useState<boolean[]>([])
  const [matched, setMatched] = useState<boolean[][]>([])
  const [canFlip, setCanFlip] = useState(true)
  const [showCongrats, setShowCongrats] = useState(false)

  useEffect(() => {
    const shuffledCards = [...onePieceCharacters, ...onePieceCharacters].sort(() => Math.random() - 0.5)
    setCards(shuffledCards)
    setFlipped(new Array(shuffledCards.length).fill(false))
    setMatched(new Array(shuffledCards.length).fill(false))
  }, [])

  useEffect(() => {
    if (matched.every(Boolean) && matched.length > 0) {
      setShowCongrats(true)
      setTimeout(() => {
        setShowCongrats(false)
        onComplete(true)
      }, 3000)
    }
  }, [matched, onComplete])

  const handleCardClick = (index: number) => {
    onPlayMusic()
    if (!canFlip || flipped[index] || matched[index]) return

    const newFlipped = [...flipped]
    newFlipped[index] = true
    setFlipped(newFlipped)

    const flippedCards = newFlipped.reduce((acc, curr, idx) => (curr && !matched[idx] ? [...acc, idx] : acc), [])

    if (flippedCards.length === 2) {
      setCanFlip(false)
      if (cards[flippedCards[0]].name === cards[flippedCards[1]].name) {
        const newMatched = [...matched]
        newMatched[flippedCards[0]] = true
        newMatched[flippedCards[1]] = true
        setMatched(newMatched)
        setCanFlip(true)
      } else {
        setTimeout(() => {
          const resetFlipped = [...newFlipped]
          resetFlipped[flippedCards[0]] = false
          resetFlipped[flippedCards[1]] = false
          setFlipped(resetFlipped)
          setCanFlip(true)
        }, 1000)
      }
    }
  }

  return (
    <div className="text-center h-screen flex flex-col justify-center items-center overflow-hidden p-0 m-0">
      <h3 className="text-xl text-orange-200">Guess which one&apos;s which!</h3>
      <div className="w-full max-w-screen-lg flex-grow overflow-auto">
        <div className="grid grid-cols-4 md:grid-cols-4 sm:grid-cols-2 gap-4 w-full max-w-screen-lg center">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`w-full h-48 bg-orange-500 rounded-2xl cursor-pointer flex items-center justify-center overflow-hidden shadow-lg transition-transform duration-300 transform hover:scale-105 hover:rounded-2xl will-change-transform ${
                flipped[index] || matched[index] ? "bg-orange-300" : ""
              }`}
              onClick={() => handleCardClick(index)}
            >
              {flipped[index] || matched[index] ? (
                <Image
                  src={card.image || "/placeholder.svg"}
                  alt={card.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-2xl"
                />
              ) : (
                <span className="text-6xl text-white">?</span>
              )}
            </div>
          ))}
        </div>
      </div>
      {showCongrats && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="text-white text-2xl bg-orange-500 p-8 rounded-lg">
            <p className="mb-4">Congrats!</p>
            <img src="/cat-meme.jpg" alt="Congratulations Cat Meme" className="max-w-sm mx-auto rounded-lg" />
          </div>
        </div>
      )}
    </div>
  )
}

export default MatchingGame

