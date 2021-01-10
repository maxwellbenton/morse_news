import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';

const defaultMessage = "a new test. This is a test. A longer test sentence. An even longer test sentence this is much longer hey how are you doing?. Reallylongwordtestoverhere!"

const dash = "-"
const dot = "•"
const pause = "_"
const end = "/"

const morseTranslation = {
  "a": [dot, dash],
  "b": [dash, dot, dot, dot],
  "c": [dash, dot, dash, dot],
  "d": [dash, dot, dot],
  "e": [dot],
  "f": [dot, dot, dash, dot], 
  "g": [dash, dash, dot],
  "h": [dot, dot, dot, dot],
  "i": [dot, dot],
  "j": [dot, dash, dash, dash],
  "k": [dash, dot, dash],
  "l": [dot, dash, dot, dot],
  "m": [dash, dash],
  "n": [dash, dot],
  "o": [dash, dash, dash],
  "p": [dot, dash, dash, dot],
  "q": [dash, dash, dot, dash],
  "r": [dot, dash, dot],
  "s": [dot, dot, dot],
  "t": [dash],
  "u": [dot, dot, dash],
  "v": [dot, dot, dot, dash],
  "w": [dot, dash, dash],
  "x": [dash, dot, dot, dash],
  "y": [dash, dot, dash, dash],
  "z": [dash, dash, dot, dot],
  " ": [pause],
  ".": [dot, dash, dot, dash, dot, dot],
  "?": [dot, dot, dash, dash, dot, dot]
}

function splitMessageIntoWords(m = "") {
  return m.split(' ')
}

function App() {
  const [message, setMessage] = useState(splitMessageIntoWords(defaultMessage))
  const [convertedMessage, setConvertedMessage] = useState(convertToMorse(defaultMessage))
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentPointIndex, setCurrentPointIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPointIndex(oldIndex => oldIndex + 1);
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    if (convertedMessage[currentPointIndex] === "_") {
      setCurrentWordIndex(oldIndex => oldIndex + 1);
    }
  }, [currentPointIndex])

  useEffect(() => {
    document.querySelector(".App").scrollTo({
      left: currentWordIndex*300,
      behavior: 'smooth'
    }) 
  }, [currentWordIndex])

  function convertToMorse(string) {
    let a = string.split('').reduce((morseConversion, currentChar) => {
      let conversion = morseTranslation[currentChar.toLowerCase()]
      if (conversion) {
        return morseConversion + conversion.join('') + " "
      } else {
        return morseConversion + ""
      }
    }, "").trim()
    
    return a
  }

  function wrapInSpans(arrayOfStrings, outputType) {
    if (outputType === "morse") {
      return arrayOfStrings.map((string, index) => {
        string = convertToMorse(string)
        if (index === currentWordIndex) {
          return <span id={outputType+index.toString()} key={outputType+index.toString()}><b>{string}</b></span>
        } else {
          return <span id={outputType+index.toString()} key={outputType+index.toString()}>{string}</span>
        }
      })
    } else {
      return arrayOfStrings.map((string, index) => {
        if (index === currentWordIndex) {
          return <span id={outputType+index.toString()} key={outputType+index.toString()}><b>{string}</b></span>
        } else {
          return <span id={outputType+index.toString()} key={outputType+index.toString()}>{string}</span>
        }
      })
    }
  }  

  return (
    <div className="App">
      <div className="info">
        <span>{convertedMessage[currentPointIndex]}</span>
      </div>
      <div className="morseOutput">{wrapInSpans(message, "morse")}</div>
      <div className="messageOutput">{wrapInSpans(message, 'text')}</div>
    </div>
  );
}

export default App;
