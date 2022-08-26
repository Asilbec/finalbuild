import React from "react";
import { useStateContext } from "../context";
import * as tf from '@tensorflow/tfjs';
import useInterval from "use-interval";
import { useEffect, useState, useRef } from "react";
import InputSection from "./Inputs";
import { Button } from "@mui/material";
import Chartz from "./ChartGraph";

function Webcam() {
    const { updateLayerCount, ready, updatingPrediction, classNames } = useStateContext()
    const videoRef = useRef();
    const [start, setStart] = useState(true);
    const [result, setResult] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [model, setModel] = useState();
    const [biggerValue, newbiggerValue] = useState()
    useInterval(() => {
        if (start) {
            Predict()
        }
    }, 500);

    const toggle = () => {
        setStart(!start);
    }


    function Predict() {
        let resized = tf.browser.fromPixels(videoRef.current).resizeBilinear([224, 224]);
        let normalized = tf.div(resized, 255);
        let data = tf.reshape(normalized, [1, 224, 224, 3]);
        let prediction = model.predict(data).arraySync();
        const max = Math.max(...prediction[0])
        const index = prediction[0].indexOf(max);
        newbiggerValue({
            max: max, index: index
        })
        console.log(prediction)
        setResult(prediction)
        updatingPrediction(prediction)
        console.log(result)
    }

    async function loadModel() {
        try {
            //for future input selection keep
            //       const model = await tf.loadLayersModel(tf.io.browserFiles([inputfile.files[0]],[inputfile.files[0]]));
            const model = await tf.loadLayersModel('/model/model.json');
            updateLayerCount(model.layers[1].outputLayers[0].units)
            setModel(model);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        tf.ready().then(() => {
            loadModel()
            navigator.mediaDevices
                .getUserMedia({ video: true, audio: false })
                .then((stream) => {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                    setLoaded(true);
                });
        });
    }, [])

    return (
        <div className="WebcamContainer">
            <div className="capture">
                <video
                    ref={videoRef}
                    width="100%"
                    id='video'
                />
                {ready && (
                    <div className="ButtonAndLabel">
                        <Button variant="contained" id='startbutton' onClick={() => { toggle() }}>
                            {start ? "Stop" : "Start"}
                        </Button>
                        <h2>{classNames[biggerValue.index]} : {(biggerValue.max * 100).toFixed(2)}%</h2>
                    </div>
                )}
            </div>
            {ready && (
                <div className="graph">
                    <Chartz />
                </div>
            )}
            {ready === false && (
                        <InputSection />
            )}
        </div>
    )
}

export default Webcam