"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"

interface FlappyBirdGameProps {
  onComplete: (success: boolean) => void
  onPlayMusic: () => void
}

const FlappyBirdGame: React.FC<FlappyBirdGameProps> = ({ onComplete, onPlayMusic }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let bird = { x: 150, y: canvas.height / 2, velocity: 0, size: 30 }
    let obstacles: { x: number; y: number; height: number; passed: boolean }[] = []
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let totalDistance = 0
    const gravity = 0.4
    const jumpStrength = -8
    const obstacleWidth = 60
    const gap = 200
    const gameSpeed = 2

    const drawBackground = () => {
      // Draw ocean
      ctx.fillStyle = "#4a90e2"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    const gameLoop = () => {
      if (!gameStarted) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update total distance
      totalDistance += gameSpeed

      // Draw scrolling background
      drawBackground()

      // Update bird position
      bird.velocity += gravity
      bird.y += bird.velocity

      // Draw bird
      ctx.fillStyle = "yellow"
      ctx.beginPath()
      ctx.arc(bird.x, bird.y, bird.size / 2, 0, Math.PI * 2)
      ctx.fill()

      // Generate and move obstacles
      if (obstacles.length === 0 || obstacles[obstacles.length - 1].x < canvas.width - 300) {
        const height = Math.random() * (canvas.height - gap - 100) + 50
        obstacles.push({ x: canvas.width, y: 0, height, passed: false })
      }

      obstacles.forEach((obstacle) => {
        obstacle.x -= gameSpeed

        // Draw top obstacle
        ctx.fillStyle = "green"
        ctx.fillRect(obstacle.x, obstacle.y, obstacleWidth, obstacle.height)

        // Draw bottom obstacle
        ctx.fillRect(obstacle.x, obstacle.height + gap, obstacleWidth, canvas.height - obstacle.height - gap)

        // Check collision
        if (
          bird.x + bird.size / 2 > obstacle.x &&
          bird.x - bird.size / 2 < obstacle.x + obstacleWidth &&
          (bird.y - bird.size / 2 < obstacle.height || bird.y + bird.size / 2 > obstacle.height + gap)
        ) {
          setGameStarted(false)
          onComplete(false)
        }

        // Increase score
        if (obstacle.x + obstacleWidth < bird.x && !obstacle.passed) {
          setScore((prevScore) => prevScore + 1)
          obstacle.passed = true
        }
      })

      // Remove obstacles that are off-screen
      obstacles = obstacles.filter((obstacle) => obstacle.x > -obstacleWidth)

      // Check if bird is out of bounds
      if (bird.y > canvas.height || bird.y < 0) {
        setGameStarted(false)
        onComplete(false)
      }

      // Check if game is complete
      if (score >= 5) {
        setGameStarted(false)
        onComplete(true)
      }

      animationFrameId = requestAnimationFrame(gameLoop)
    }

    const handleJump = () => {
      onPlayMusic()
      if (!gameStarted) {
        setGameStarted(true)
        setScore(0)
        bird = { x: 150, y: canvas.height / 2, velocity: 0, size: 30 }
        obstacles = []
        totalDistance = 0
      } else {
        bird.velocity = jumpStrength
      }
    }

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        handleJump()
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    canvas.addEventListener("click", handleJump)

    gameLoop()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("keydown", handleKeyPress)
      canvas.removeEventListener("click", handleJump)
    }
  }, [gameStarted, onComplete, onPlayMusic, score])

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-orange-500 p-8 rounded-3xl shadow-lg">
        <h3 className="text-3xl mb-4 text-white">Flappy Bird: Singapore to Seattle</h3>
        <p className="text-white mb-4 text-xl">Score: {score}/5</p>
        <canvas ref={canvasRef} width={1000} height={500} className="border-4 border-orange-300 rounded-2xl" />
        {!gameStarted && (
          <button
            onClick={() => setGameStarted(true)}
            className="mt-6 px-6 py-3 bg-orange-600 text-white rounded-full text-xl hover:bg-orange-700 transition-colors duration-300"
          >
            Start Game
          </button>
        )}
        <p className="text-white mt-4 text-lg">Press Space or Click to jump</p>
      </div>
    </div>
  )
}

export default FlappyBirdGame

 