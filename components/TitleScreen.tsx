import type React from "react"
import type { FontType } from "../types"

interface TitleScreenProps {
  onStart: () => void
  dancingScript: FontType
}

const TitleScreen: React.FC<TitleScreenProps> = ({ onStart, dancingScript }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <h1 className={`text-5xl mb-8 text-orange-300 ${dancingScript.className}`}>
        Happy 5 Months & Belated Valentine&apos;s Day!
      </h1>
      <button
        onClick={onStart}
        className="px-6 py-3 text-2xl bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors duration-300"
      >
        Start Our Adventure
      </button>
    </div>
  )
}

export default TitleScreen

