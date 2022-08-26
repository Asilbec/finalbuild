import { React } from "react";
import { useStateContext } from "../context";
import { Button, TextField } from "@mui/material";

function InputSection() {
    const { classNames, updateLayersNames,changeReadyStatus } = useStateContext()
    function sendComplete() {
        const vars = document.getElementsByClassName("text")
        const sendingList = []
        console.log(vars.length)
        for(let x=0;x<vars.length;x++){
            const userinput = vars[x].children[1].children[0].value
            if(userinput.length <1){
                sendingList.push('Class ' + (x+1))
            }else(
                sendingList.push((vars[x].children[1].children[0].value))
            )
        }
        updateLayersNames(sendingList)
        changeReadyStatus()
    }

    return (
        <div className="inputContainer">
            <h1>Name your Classes</h1>
            <h3>Detected {classNames.length} classes</h3>
            {classNames.map((index, item) => (
                <TextField
                    className="text"
                    key={index}
                    label={"Class " + (item + 1)}
                    variant={'outlined'}
                />
            ))}
            <Button onClick={() => sendComplete()} id='submitButton' variant="contained">Next</Button>
        </div>
    )
}



export default InputSection