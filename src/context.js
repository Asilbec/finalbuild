import React, { createContext, useContext, useState, useEffect } from 'react';
const Context = createContext();

export const StateContext = ({ children }) => {

    const [moveScreen, newScreen] = useState(true)
    const [classNames, updateClassNames] = useState([])
    const [layersCount, updateLayersCount] = useState(0)
    const [ready,updateReady] = useState(false)
    const [predictionres,newPredictionRes] = useState([])
    const [inputfile,newInputFile] = useState()

    const testingFunction = () => {
        console.log('nice')
    }

    const updatingPrediction = (list) => {
        newPredictionRes(list)
    }

    const updateLayerCount = (count) => {
        updateClassNames([])
        for (let x = 0; x < count; x++) {
            updateClassNames(classNames => [...classNames, ("Classname" +(x+1))])
        }
    }

    const changeReadyStatus = () =>{
        if(ready){
            updateReady(false)
        }else{
            updateReady(true)
        }
    }

    const updateLayersNames = (list) =>{
        updateClassNames(list)
    }

    const updateScreen = () => {
        const uploadJSONInput = document.getElementById('uploadjson');
        newInputFile(uploadJSONInput)
        if (moveScreen) {
            newScreen(false)
        } else (
            newScreen(true)
        )
    }

    return (
        <Context.Provider
            value={{
                testingFunction,
                moveScreen,
                newScreen,
                updateScreen,
                updateLayersNames,
                classNames,
                updateClassNames,
                layersCount,
                updateLayersCount,
                updateLayerCount,
                ready,
                changeReadyStatus,
                predictionres,
                updatingPrediction,
                inputfile
            }}>
            {children}
        </Context.Provider >
    )
}
export const useStateContext = () => useContext(Context);
