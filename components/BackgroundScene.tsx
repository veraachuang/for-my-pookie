import type React from "react"

const BackgroundScene: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      <video autoPlay loop muted playsInline className="absolute min-w-full min-h-full object-cover">
        <source src="/kyoto-anime-background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

export default BackgroundScene

