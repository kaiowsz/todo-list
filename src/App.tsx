import { useCallback, useEffect, useState } from "react"
import words from "./wordList.json"

import { HangmanDrawing } from "./HangmanDrawing"
import { HangmanWord } from "./HangmanWord"
import { Keyboard } from "./Keyboard"

function App() {
  const [wordToGuess, setWordToGuess] = useState(() => (
    words[Math.floor(Math.random() * words.length)]
  ))
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  const incorrectLetters = guessedLetters.filter(
    letter => !wordToGuess.includes(letter)     
  )

  const isLoser = incorrectLetters.length >= 6

  const isWinner = wordToGuess.split("").every(letter => guessedLetters.includes(letter))

  const addGuessedLetter = useCallback((letter: string) => {
    if(guessedLetters.includes(letter) || isLoser || isWinner) return

    setGuessedLetters(currentLetters => [...currentLetters, letter]) 
  }, [guessedLetters, isWinner, isLoser])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key

      if(!key.match(/^[a-z]$/)) return

      e.preventDefault()
      addGuessedLetter(key)
    }

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }

  }, [guessedLetters])


  return (
    <div style={{
      maxWidth: "800px",
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
      margin: "0 auto",
      alignItems: "center"
    }}>

      <div style={{
        fontSize: "2rem",
        textAlign: "center"
      }}>{isWinner && "Winner! Refresh to try again"}
        {isLoser && "Nice try - Refresh to try again"}
      </div>

      <HangmanDrawing numberOfGuesses={incorrectLetters.length}/>
      <HangmanWord reveal={isLoser} word={wordToGuess} guessedLetters={guessedLetters}/>
      <div style={{
        alignSelf: "stretch"
      }}>
        <Keyboard
        disabled={isWinner || isLoser}
        activeLetters={guessedLetters.filter(letter => wordToGuess.includes(letter))}
        inactiveLetters={incorrectLetters}
        addGuessedLetter={addGuessedLetter}
        />
      </div>



    </div>
  )
}

export default App
