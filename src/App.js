import React from 'react'
import Die from './components/Die';
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti';

function App() {
  
  const [diceArr, setDiceArr] = React.useState(() => allNewDice()) //lazy state initialization

  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    const isTrue = diceArr.every(die => die.isHeld)
    const firstDie = diceArr[0].value
    const valuesMatch = diceArr.every(die => die.value === firstDie)
    if(isTrue && valuesMatch) {
      setTenzies(true)
    }
  }, [diceArr])

  function generateNewDie() {
    return { 
      value: Math.floor((Math.random() * 6) + 1),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const randomArr = []
    for(let i = 0; i < 10; i++){
      randomArr.push(generateNewDie())
    }
    return randomArr
  }

  function rollDice() {
    if (tenzies) {
      setDiceArr(allNewDice())
      setTenzies(false)
    } else {
      setDiceArr(prevDrice => prevDrice.map(die => die.isHeld ? die : generateNewDie()))
    }
  }

  function holdDice(id) {
    setDiceArr(prevDice => prevDice.map(die => {
      return die.id === id ? 
        {
        ...die,
        isHeld: !die.isHeld
        } :
        die
    }))
  }

  const newDice = diceArr.map(num => (<Die 
                                        key={num.id} 
                                        value={num.value}
                                        isHeld={num.isHeld}
                                        handleClick={() => holdDice(num.id)} 
                                      />))

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className='header'>Tenzies</h1>
      <p className='instructions'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls</p>
      <div className='dice-container'>
        {newDice}
      </div>
      <button className='button' onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  );
}

export default App;
