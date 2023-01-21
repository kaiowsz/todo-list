import { useState } from "react"
import words from "./wordList.json"

import { HangmanDrawing } from "./HangmanDrawing"
import { HangmanWord } from "./HangmanWord"
import { Keyboard } from "./Keyboard"

function App() {
  const [wordToGuess, setWordToGuess] = useState(() => (
    words[Math.floor(Math.random() * words.length)]
  ))
  const [guessed, setGuessed] = useState<Array<string>>([])

 /* to declare a type in react, just put the type inside a <> 
 like <string[]> */

  console.log(wordToGuess)

  return (
    <div style={{
      maxWidth: "800px",
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
      margin: "0 auto",
      alignItems: "center "
    }}>

      <div style={{
        fontSize: "2rem",
        textAlign: "center"
      }}>Lose Win</div>

      <HangmanDrawing />
      <HangmanWord />
      <Keyboard />



    </div>
  )
}

export default App
