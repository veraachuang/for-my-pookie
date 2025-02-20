import type React from "react"
import { Pause, Play } from "lucide-react"

interface PauseMusicButtonProps {
  isPlaying: boolean
  onToggle: () => void
}

const PauseMusicButton: React.FC<PauseMusicButtonProps> = ({ isPlaying, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="fixed bottom-4 right-4 bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors duration-300 z-30"
    >
      {isPlaying ? <Pause size={24} /> : <Play size={24} />}
    </button>
  )
}

export default PauseMusicButton

