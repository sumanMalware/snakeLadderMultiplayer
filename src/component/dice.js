import React, { useState } from 'react'
import './Dice.css'
import dicePic from '../imgs/dice.png'


function GameDice({ TotalPlayers }) {


  let snakeHead = [23, 52, 62, 87, 99]
  let snakeTail = [2, 5, 22, 56, 41]
  let ladderStart = [10, 16, 35, 44, 68]
  let ladderEnd = [33, 38, 55, 79, 90]


  let playerChance = []
  for (let chance = 0; chance < TotalPlayers.length; chance++) {
    playerChance.push(TotalPlayers[chance].playerName)
  }

  const [player, setPlayer] = useState("start")
  const [count, setCount] = useState(0)

  const PlayerChance = () => {

    setPlayer(playerChance[count])
    if (count === TotalPlayers.length - 1) {
      setCount(0)
    } else {
      setCount(count + 1)
    }

  }

  const [random, setRandom] = useState("");

  const DiceRoll = () => {
    PlayerChance()
    let dice = Math.ceil(Math.random() * 6)
    setRandom(dice)

    TotalPlayers[count].playerState(playerChance[1])
    if (snakeHead.includes(TotalPlayers[count].playerPos + dice)) {
      TotalPlayers[count].playerState(snakeTail[snakeHead.indexOf(TotalPlayers[count].playerPos + dice)])
    } else if (ladderStart.includes(TotalPlayers[count].playerPos + dice)) {
      TotalPlayers[count].playerState(ladderEnd[ladderStart.indexOf(TotalPlayers[count].playerPos + dice)])
    } else {
      TotalPlayers[count].playerState(TotalPlayers[count].playerPos + dice)
    }

    if (TotalPlayers[count].playerPos === 100) {
      TotalPlayers[count].playerState(1)

      alert(`${playerChance[count]} won`)
    }
    else if (TotalPlayers[count].playerPos > 100) {
      let lastPOs = TotalPlayers[count].playerPos - dice
      TotalPlayers[count].playerState(lastPOs)
    }

  }


  console.log(TotalPlayers[0].playerName)


  return (
    <div className='box'>
      <div >

        <img src={dicePic} alt="dice" onClick={DiceRoll} id='dice' className='dice' />
        <h2 id='diceNo'>{random}</h2>

        <div className="chance"><h1 id='Chance'>{player}</h1></div>
        {TotalPlayers.map((valu, key) =>
          <div className={`player${key}`}>
            <h3>
              {console.log(TotalPlayers.length)}
              {valu.playerName} {valu.playerIcon} Position :
              <span className='playerpoint'>
                {valu.playerPos}
              </span>
            </h3>
          </div>
        )}
        <button onClick={() => window.location.reload(false)}>Reset</button>
      </div>
    </div>


  )
}
export default GameDice