type HangmanWordProps = {
    word: string;
    guessedLetters: Array<string>;
    reveal?: boolean;
}

export function HangmanWord({word, guessedLetters, reveal = false}: HangmanWordProps) {

    return (
        <div style={{
            display: "flex", gap: ".25em", fontSize: "6rem", fontWeight: "bold", textTransform: "uppercase", fontFamily: "monospace"
        }}>
            {word.split("").map((letter, index) => (
                <span key={index} style={{
                    borderBottom: "8px solid black" }}>
                    <span style={{ 
                        visibility: guessedLetters.includes(letter) || reveal ? "visible" : "hidden",
                        color: !guessedLetters.includes(letter) && reveal ? "red" : "black"}}>
                        {letter}    
                    </span>
                </span>
            ))}
        </div>
    )
}