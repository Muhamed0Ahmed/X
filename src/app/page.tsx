"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Cell from "@/component/Cell";

const winnercells:number[][] = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1, 4, 7],
  [2,5,8],
  [0,4,8],[2,4,6]  
]

export default function Home() {
  const [cells, setCells] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setplayer] = useState("X");
  const [winner, setWinner] = useState(false);
  const [winnerName, setWinnerName] = useState("");
  const [gameOver, setGameOver] = useState(false);
  
  const handleGameOVer = () => {
    location.reload()
  }
  const RestGame = () => {
    setCells(["", "", "", "", "", "", "", "", ""]);
    setplayer("X");
    setWinner(false);
    setGameOver(false)
  }
  useEffect(() => {
    winnercells.forEach(winCell =>{
      const XWins = winCell.every((cell) => cells[cell] === "X");
      const OWins = winCell.every((cell) => cells[cell] === "O");
      if(XWins) {
        setWinner(true);
        setWinnerName("X")

      }else if(OWins){
        setWinner(true);
        setWinnerName("O");
      }
    })

  }, [player, cells])

 useEffect (() => {
  if(cells.every(cell => cell !== "") && !winner){
    setGameOver(true);
  }
 },[cells, winner])

  return (
    <main className={styles.main}>
      {winner ? 
      <div className={styles.container}>
        <h1 className={styles.header}>winner : {winnerName}</h1>
        <button className={styles.btnReset} onClick={RestGame}>Reset Game</button>
      </div>
        :
      <div className={styles.container}>
        <h1 className={styles.header}>X O game</h1>
        <div className={styles.boxContainer}>
          {cells.map((cell, index) => (
            <Cell
              id={index}
              key={index}
              winner={winner}
              player={player}
              setCells={setCells}
              setPlayer={setplayer}
              cells={cells}
              cell={cell}
            />
          ))}
        </div>
        <div>
          {gameOver ?
           <div className={styles.gameOverContainer}>
             <span>Game Over</span>
             <button onClick={handleGameOVer}>Reset Game</button> 
             </div> 
           :
          winner? 
          <div className={styles.showPlayer}>The Winner  : {winnerName}</div>:<div className={styles.showPlayer}>player : {player}</div>}
        

        </div>
        
      </div>}
    </main>
  );
}
