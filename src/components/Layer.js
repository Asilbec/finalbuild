import React from "react";
import LoadingLayout from "./LoadingPage";
import Webcam from "./Webcam";
import { useStateContext } from "../context";

function Layout() {
    const {moveScreen } = useStateContext()
    return (
        <div className="Layout">
            {moveScreen && (
                <LoadingLayout />
            )}
            {moveScreen===false && (
                <Webcam/>
            )}
        </div>
    )
}

export default Layout