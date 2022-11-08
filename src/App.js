import React, { useState } from "react";
import "./App.css";
import diceimg from "./dice.png";
import snakeladder from "./snakeandladder.png";
import ladder from "./ladder.png";
import snakegif from "./snakeGif.gif";
import CellValues from "./component/CellValues";

let numOfPlayers = 4
let player_Icon = ["❤️", "💛", "💚", "💙"]
let player_Name = ["Rithin", "Suman", "Srini", "shiva"]


const App = () => {``
    function refreshPage() {
        window.location.reload();
    }



    let allPlayers = []
    for (let num = 0; num < numOfPlayers; num++) {
        allPlayers.push(`player${num + 1}`)
    }

    let totalPlayers = []

    for (let index = 0; index < numOfPlayers; index++) {
        totalPlayers.push({
            tag: index,
            playerID: allPlayers[index],
            playerIcon: player_Icon[index],
            playerName: player_Name[index],
            playerPos: 1,
        })
    }
    console.log(totalPlayers);


    let snakes = [23, 34, 52, 80, 99];
    let ladders = [10, 21, 35, 67, 77];
    let toLadders = [33, 42, 56, 89, 98];
    let toSnakes = [2, 15, 31, 58, 76];

    let playerChance = []
    for (let chance = 0; chance < totalPlayers.length; chance++) {
        playerChance.push(totalPlayers[chance].playerName)
    }

    const [player, setPlayer] = useState("start")
    const [count, setCount] = useState(0)

    const PlayerChance = () => {

        setPlayer(playerChance[count])
        if (count === totalPlayers.length - 1) {
            setCount(0)
        } else {
            setCount(count + 1)
        }

    }

    const [state, setstate] = useState(totalPlayers)
    const [random, setRandom] = useState(0);



    const DiceRoll = () => {
        PlayerChance()
        let dice = Math.ceil(Math.random() * 6)
        setRandom(dice)

        state.forEach(element => {
            if (count === element.tag) {
                if (snakes.includes(element.playerPos + dice)) {
                    element.playerPos = (toSnakes[snakes.indexOf(element.playerPos + dice)])
                } else if (ladders.includes(element.playerPos + dice)) {
                    element.playerPos = (toLadders[ladders.indexOf(element.playerPos + dice)])
                } else {
                    element.playerPos += dice
                }
                if (element.playerPos === 100) {
                    refreshPage()
                    alert(`${element.playerName} won`)
                }
                else if (element.playerPos > 100) {
                    let lastPOs = element.playerPos - dice
                    element.playerPos = (lastPOs)
                }
                if (count === state.length) {
                    setCount(1)

                }
            }
        })
        setstate(state)

    }


    console.log(totalPlayers[0].playerName)
    let arr = []

    for (let i = 100; i >= 1; i -= 10) {
        if (i % 20 === 0) {
            for (let j = i; j > (i - 10); j--) {
                arr.push(j)
            }
        } else {
            for (let j = (i - 9); j <= i; j++) {
                arr.push(j)
            }
        }

    }
    return (
        <div id="main">
            <img src={ladder} alt="Ladder" className="ladder1" />
            <img src={ladder} alt="Ladderr" className="ladder2" />
            <img src={ladder} alt="Ladderr" className="ladder3" />
            <img src={ladder} alt="Ladderr" className="ladder4" />
            <img src={ladder} alt="Ladderr" className="ladder5" />
            <img src={snakegif} alt="snake" className="snake1" />
            <img src={snakegif} alt="snake" className="snake2" />
            <img src={snakegif} alt="snake" className="snake3" />
            <img src={snakegif} alt="snake" className="snake4" />
            <img src={snakegif} alt="snake" className="snake5" />

            <div className="gridclass">
                {arr.map(val =>
                    <div className="normal" id={val.toString()}>
                        <div className="grid">
                            <CellValues
                                key={val}
                                count={val}
                                playerIcon={state}
                            />
                        </div>
                    </div>
                )}

            </div>
            <div id="container">
                <div className="one">
                    {totalPlayers.map((valu, key) =>
                        <div key={key} className={`player${key}`}>
                            <span className='playerSpan'>
                                {valu.playerName} {valu.playerIcon} Position :
                                <span className='playerpoint'>
                                    {state[key].playerPos}
                                </span>
                            </span>
                        </div>
                    )}

                    <div className="tv">
                        <h2 id="turn">{player}'s Turn</h2>
                    </div>
                </div>
                <div className="two">
                    <div>
                        <img src={snakeladder} alt="snakel" id="laddersnake" />
                    </div>
                </div>
                <div className="three">
                    <div className="dicepoint">
                        <h1 id="display">{random}</h1>
                    </div>
                    <div className="dicepoint2">
                        <img src={diceimg} alt="dice" id="diceimg" onClick={DiceRoll} />
                    </div>
                </div>
                <button onClick={refreshPage} id="refresh">
                    <h2>RESET GAME</h2>
                </button>
            </div>
        </div>
    );
};

export default App;
