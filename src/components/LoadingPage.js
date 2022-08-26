import React from "react";
import { useStateContext } from "../context";
import { Button } from "@mui/material";

function LoadingLayout(){
    const {updateScreen, predictionres} = useStateContext()
    return(
        <div className="LoadingScreen">
            <Button variant="contained" onClick={updateScreen}>
                Continue
            </Button>
        </div>
    )
}

export default LoadingLayout