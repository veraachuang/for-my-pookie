import type React from "react"
import type { FontType } from "../types"

interface LoveLetterProps {
  dancingScript: FontType
}

const LoveLetter: React.FC<LoveLetterProps> = ({ dancingScript }) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-orange-100 p-8 rounded-lg shadow-lg max-w-2xl w-full transform rotate-1">
        <div className={`text-orange-800 ${dancingScript.className}`}>
          <h2 className="text-4xl mb-6 text-center">My BUBBY,</h2>
          <p className="text-xl mb-4">
            Happy 5 months and belated Valentine's Day! Sorry this came a little late, don't worry I'm not getting lazy yet
          </p>
          <p className="text-xl mb-4">
            Just like the games you've played, our relationship is an adventure. We catch each other when we fall, we
            match perfectly, and together, we can overcome any obstacle that comes our way. (Chat wrote this)
          </p>
          <p className="text-xl mb-4">
            Thank you for being my partner, my best friend, and my greatest support. Since we're not going to Japan, I thought I'd bring cherry blossoms to you. 
            I'm so so excited for our adventures in Taiwan. I love you best friend.
          </p>
          <p className="text-xl text-right">
            I can't wait to see you again,
            <br />
            Vera
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoveLetter

