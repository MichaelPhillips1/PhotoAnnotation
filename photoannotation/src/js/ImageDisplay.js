import { useEffect, useRef, useState } from "react";
import store from './store';
import { useSelector } from 'react-redux';

function ImageDisplay() {
    const canvasRef = useRef(null);
    const [drawMode, setDrawMode] = useState(false);
    const imagePath = useSelector(state => state.imagePath);
    const imageDimensions = useSelector(state => state.imageDimensions);
    const boundingBoxes = useSelector(state => state.boundingBoxes);
    const [coords, setCoords] = useState([])

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = imagePath;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        img.onload = function () {
            store.dispatch({type: 'set/imageDimensions', payload: [img.height, img.width]})

            canvas.width = img.width;
            canvas.height = img.height;

            const aspectRatio = img.width / img.height;
            let drawWidth, drawHeight, offsetX, offsetY;

            if (canvas.width / canvas.height > aspectRatio) {
                drawHeight = canvas.height;
                drawWidth = drawHeight * aspectRatio;
                offsetX = (canvas.width - drawWidth) / 2;
                offsetY = 0;
            } else {
                drawWidth = canvas.width;
                drawHeight = drawWidth / aspectRatio;
                offsetX = 0;
                offsetY = (canvas.height - drawHeight) / 2;
            }

            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        };
    }, [imagePath, ]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = imagePath;

        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;

            const aspectRatio = img.width / img.height;
            let drawWidth, drawHeight, offsetX, offsetY;

            if (canvas.width / canvas.height > aspectRatio) {
                drawHeight = canvas.height;
                drawWidth = drawHeight * aspectRatio;
                offsetX = (canvas.width - drawWidth) / 2;
                offsetY = 0;
            } else {
                drawWidth = canvas.width;
                drawHeight = drawWidth / aspectRatio;
                offsetX = 0;
                offsetY = (canvas.height - drawHeight) / 2;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
            ctx.strokeStyle = "red";
            ctx.fillStyle = "red";
            ctx.lineWidth = 2;
            let textHeight = 16;
            ctx.font = "16px Arial";
            boundingBoxes.forEach(element => {
                const metrics = ctx.measureText(element[2]);
                const textWidth = metrics.width;
                ctx.fillText(element[2], ((element[0][0] + element[1][0]) / 2) - (textWidth / 2), (element[0][1] - (textHeight)));
                ctx.strokeRect(element[0][0], element[0][1], element[1][0] - element[0][0], element[1][1] - element[0][1]);
            });
        }
    }, [boundingBoxes])

    function onClickHandler(e) {
        let rect = e.target.getBoundingClientRect();
        let x = ((e.clientX - rect.left) / rect.width) * imageDimensions[1];
        let y = ((e.clientY - rect.top) / rect.height) * imageDimensions[0];

        if (coords.length === 0) {
            setDrawMode(true);
            setCoords([[x, y]]);
        } else if (coords.length === 1) {
            setDrawMode(false);
            const start = coords[0]; 
            const end = [x, y];             
            setCoords([start, end, boundingBoxes.length]);
            store.dispatch({ type: 'add/boundingBoxes', payload: [start, end, boundingBoxes.length] })
        } else if (coords.length > 1) {
            setCoords([[x, y]]);
            setDrawMode(true);
        }
    }


    function mouseMoveHandler(e) {
        if (!drawMode) {
            return
        }
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = imagePath;

        img.onload = function () {
            store.dispatch({type: 'set/imageDimensions', payload: [img.height, img.width]})

            canvas.width = img.width;
            canvas.height = img.height;

            const aspectRatio = img.width / img.height;
            let drawWidth, drawHeight, offsetX, offsetY;

            if (canvas.width / canvas.height > aspectRatio) {
                drawHeight = canvas.height;
                drawWidth = drawHeight * aspectRatio;
                offsetX = (canvas.width - drawWidth) / 2;
                offsetY = 0;
            } else {
                drawWidth = canvas.width;
                drawHeight = drawWidth / aspectRatio;
                offsetX = 0;
                offsetY = (canvas.height - drawHeight) / 2;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

            try {
                let canvasRect = canvas.getBoundingClientRect();
                let startX = coords[0][0];
                let startY = coords[0][1];
                let mouseX =
                    ((e.clientX - canvasRect.left) / canvasRect.width) * canvas.width;
                let mouseY =
                    ((e.clientY - canvasRect.top) / canvasRect.height) * canvas.height;
                ctx.strokeStyle = "red";
                ctx.lineWidth = 2;
                ctx.strokeRect(startX, startY, mouseX - startX, mouseY - startY);
            }
            catch { 
            }
        };
    }

    return (
        <div id="ImageDisplayDiv">
            {imagePath ? (
                <canvas
                    ref={canvasRef}
                    id="DisplayedImage"
                    onClick={onClickHandler}
                    onMouseMove={mouseMoveHandler}
                />
            ) : null}
        </div>
    );
}

export default ImageDisplay;
