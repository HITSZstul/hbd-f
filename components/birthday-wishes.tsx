"use client"

import { useState, useEffect } from "react"
import { Gift, Cake, Send, List, Mail, X, ThumbsUp, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"

export function BirthdayWishesComponent() {
  const [isGiftOpen, setIsGiftOpen] = useState(false)
  const [wishes, setWishes] = useState<string[]>([])
  const [newWish, setNewWish] = useState("")
  const [showWishList, setShowWishList] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [isLetterOpen, setIsLetterOpen] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const handleOpenGift = () => {
    setIsGiftOpen(true)
    setShowWishList(false)
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 3000)
  }

  const handleAddWish = () => {
    if (newWish.trim()) {
      setWishes([...wishes, newWish.trim()])
      setNewWish("")
      // Here you would typically send the wish to a server
      console.log("Wish sent to server:", newWish.trim())
    }
  }

  const handleLike = () => {
    setIsLiked(true)
    // Here you would typically send the like to a server
    console.log("Like sent to server")
  }

  const toggleMusic = () => {
    const audio = document.getElementById('bgMusic') as HTMLAudioElement
    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  useEffect(() => {
    return () => {
      const audio = document.getElementById('bgMusic') as HTMLAudioElement
      audio.pause()
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 to-blue-200 flex items-center justify-center p-4">
      <audio id="bgMusic" loop>
        {/* <source src="https://example.com/path/to/your/music.mp3" type="audio/mpeg" /> */}
        {/* Your browser does not support the audio element. */}
      </audio>
      <Button
        onClick={toggleMusic}
        className="fixed top-4 right-4 bg-white/50 hover:bg-white/75 text-pink-600"
        variant="outline"
        size="icon"
      >
        {isPlaying ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
      </Button>
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, index) => (
            <div
              key={index}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}vw`,
                top: `-5vh`,
                backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                animationDuration: `${Math.random() * 3 + 2}s`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-pink-600">Happy Birthday!</CardTitle>
        </CardHeader>
        <CardContent>
          {!isGiftOpen ? (
            <Button
              onClick={handleOpenGift}
              className="w-full h-32 text-2xl bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white"
            >
              <Gift className="mr-2 h-8 w-8" /> Open Your Gift
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-center">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20241018120017-680iCb3aECNMdHK2FcczFa5SYGMVF1.jpg"
                  alt="Birthday Person"
                  className="w-32 h-32 rounded-full border-4 border-pink-300"
                />
              </div>
              <Cake className="w-16 h-16 mx-auto text-pink-500" />
              <p className="text-center text-lg text-gray-700">
                May your day be filled with joy and laughter!
              </p>
              <Button
                onClick={() => setIsLetterOpen(true)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              >
                <Mail className="mr-2 h-4 w-4" /> Open Letter
              </Button>
              <div className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Add your wish..."
                  value={newWish}
                  onChange={(e) => setNewWish(e.target.value)}
                  className="flex-grow"
                />
                <Button onClick={handleAddWish} className="bg-blue-500 hover:bg-blue-600 text-white">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <Button
                onClick={() => setShowWishList(!showWishList)}
                className="w-full bg-black hover:bg-gray-800 text-white"
              >
                <List className="mr-2 h-4 w-4" /> {showWishList ? "Hide" : "Show"} Wishes
              </Button>
              {showWishList && (
                <ul className="mt-4 space-y-2">
                  {wishes.map((wish, index) => (
                    <li key={index} className="bg-pink-100 p-2 rounded-md text-gray-700">
                      {wish}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      <Dialog open={isLetterOpen} onOpenChange={setIsLetterOpen}>
        <DialogContent className="bg-pink-50 border-2 border-pink-300">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-pink-600">A Special Message for You</DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-gray-700">
            <p className="mb-4">Dear Augenstern,</p>
            <p className="mb-4">On this special day, I want to tell you how much you mean to me. Your presence in my life brings joy, laughter, and warmth. May this birthday be as wonderful as you are.</p>
            <p className="mb-4">Wishing you a year filled with exciting adventures, beautiful moments, and all the happiness you deserve.</p>
            <p>Happy Birthday!</p>
            <p className="mt-4">With love,</p>
            <p>Your Friend</p>
          </DialogDescription>
          <DialogFooter className="flex justify-between items-center">
            <Button onClick={() => setIsLetterOpen(false)} variant="outline">
              <X className="mr-2 h-4 w-4" /> Close
            </Button>
            <Button onClick={handleLike} disabled={isLiked} className={isLiked ? "bg-pink-300" : "bg-pink-500 hover:bg-pink-600"}>
              <ThumbsUp className="mr-2 h-4 w-4" /> {isLiked ? "Liked!" : "Like"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <style jsx>{`
        @keyframes confetti-fall {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(100vh) rotate(720deg); }
        }
        .animate-confetti {
          animation: confetti-fall linear forwards;
        }
      `}</style>
    </div>
  )
}