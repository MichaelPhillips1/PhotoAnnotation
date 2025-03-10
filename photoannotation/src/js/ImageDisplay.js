import { useState } from "react";

function ImageDisplay(props) { 
    
    function onClickHandler(e) {
        let rect = e.target.getBoundingClientRect();
        let x = ((e.clientX - rect.left) / e.target.offsetWidth) * props.dimensions[1];
        let y = ((e.clientY - rect.top) / e.target.offsetHeight) * props.dimensions[0];
        if (props.coords.length == 2) {
            props.setCoords([[x, y]]);
        }
        else {
            props.setCoords([...props.coords, [x, y]]);
        }
    }

    function updateDimensions(e) {
        const { naturalHeight, naturalWidth } = e.target;
        props.setDimensions([naturalHeight, naturalWidth])
    }

    return <div id="ImageDisplayDiv">
        {props.imagePath == null ? <></> :
            <img id="DisplayedImage" onLoad={updateDimensions} onClick={onClickHandler} src={props.imagePath}></img>
        }
    </div>
}

export default ImageDisplay;
