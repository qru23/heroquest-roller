import { useState, useCallback, useEffect, CSSProperties } from 'react'

import ShieldWhiteImage from './assets/shield-white.png'
import ShieldBlackImage from './assets/shield-black.png'
import SkullImage from './assets/skull.png'

const containerStyle: CSSProperties = {
  height: '100vh',
  width: '100vw',
  maxWidth: '800px',
  background: '#fff',
  margin: '0 auto',
}

const buttonHolderStyle: CSSProperties = {
  padding: '0.5rem',
  display: 'flex',
  justifyContent: 'center',
  gap: '1rem',
}

const resultHolderStyle: CSSProperties = {
  marginTop: '1rem',
  display: 'flex',
  justifyContent: 'space-around',
  height: '40px',
}

const resultStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
}

const resultImageStyle: CSSProperties = {
  objectFit: 'contain',
  height: '100%',
}

const diceHolderStyle: CSSProperties = {
  marginTop: '1rem',
  display: 'grid',
  gridTemplateColumns: '50% 50%',
  width: '100%',
}

const diceStyle: CSSProperties = {
  overflow: 'hidden',
}

const imageStyle: CSSProperties = {
  objectFit: 'contain',
  objectPosition: '50% 50%',
  width: '100%',
  height: '100%',
}

function App() {
  const [diceAmount, setDiceAmount] = useState(3)
  const [dice, setDice] = useState<(number | undefined)[]>([])
  
  const reroll = useCallback(() => {
    const array = []

    for (let i = 0; i < diceAmount; i++) {
      const rnd = Math.floor(Math.random() * 6) + 1
      array.push(rnd)
    }

    setDice(array)
  }, [diceAmount])

  useEffect(() => {
    setDice([])
  }, [diceAmount])

  return (
    <div 
      style={containerStyle}
    >
      <div
        style={buttonHolderStyle}
      >
        <button
          onClick={() => {
            if (diceAmount <= 0) return;
            setDiceAmount(diceAmount - 1)
          }}
        >
          -
        </button>
        <button
          onClick={() => {
            reroll()
          }}
        >
          Roll {diceAmount}
        </button>
        <button
          onClick={() => {
            setDiceAmount(diceAmount + 1)
          }}
        >
          +
        </button>
      </div>

      <div style={resultHolderStyle}>
        <span style={resultStyle}>
          <img style={resultImageStyle} src={SkullImage} />
          {dice.filter(d => [1, 2, 3].includes(d ?? 0)).length}
        </span>

        <span style={resultStyle}>
          <img style={resultImageStyle} src={ShieldWhiteImage} />
          {dice.filter(d => [4, 5].includes(d ?? 0)).length}
        </span>

        <span style={resultStyle}>
          <img style={resultImageStyle} src={ShieldBlackImage} />
          {dice.filter(d => [6].includes(d ?? 0)).length}
        </span>
      </div>
    
      <div
        style={diceHolderStyle}
      >
        {
          dice.map((value, index) => {
            return (
              <Dice 
                key={index}
                value={value}
              />
            )
          })
        }
      </div>
    </div>
  )
}

function Dice({ value }: { value: number | undefined }) {
  if (!value) return <></>

  return (
    <div style={diceStyle}>
      {
        <img
          style={imageStyle}
          src={(() => {
            if ([1, 2, 3].includes(value))  
              return SkullImage

            if ([4, 5].includes(value))
              return ShieldWhiteImage

            return ShieldBlackImage
          })()}
        />
      }
    </div>
  )
}
export default App
