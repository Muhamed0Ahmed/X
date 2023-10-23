import { ChangeEvent, Dispatch, SetStateAction } from "react";
import Styles from "../app/page.module.css"

interface prop{
    id:number;
    cell:string;
    cells:string[];
    player:string;
    setPlayer : Dispatch<SetStateAction<string>>;
    setCells : Dispatch<SetStateAction<string[]>>;
    winner: boolean;
}
function Cell(props:prop) {
    const {id,cells, player, setPlayer, setCells, winner} = props;

    const handleClickToCell = (e: ChangeEvent<any>) => {
        if(winner){
            return
        }
        let elTokken = cells[id]
        if(!elTokken){
            if(player === "X"){
                handleToChange("X") 
                setPlayer("O");
                e.target.style.color = "red";
            
            }
            else if(player === "O"){
                handleToChange("O");
                setPlayer("X")
            }
        }
        
        
    }
    const handleToChange =(cellToChange:string) => {
        let copyCells = [...cells];
        copyCells[id] = cellToChange;
        setCells(copyCells);

    }
    return ( 
        <span className={Styles.cell} onClick={handleClickToCell} >
            {cells[id]}
        </span>
     );
}

export default Cell;