import { useEffect, useRef, useState } from "react";

function ImageDisplay(props) {
    const canvasRef = useRef(null);
    const [drawMode, setDrawMode] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = props.imagePath;

        img.onload = function () {
            props.setDimensions([img.height, img.width]);

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
        };
    }, [props.imagePath]);

    function onClickHandler(e) {
        let rect = e.target.getBoundingClientRect();
        let x = ((e.clientX - rect.left) / rect.width) * props.dimensions[1];
        let y = ((e.clientY - rect.top) / rect.height) * props.dimensions[0];

        if (props.coords.length === 0) {
            setDrawMode(true);
            props.setCoords([[x, y]]);
        } else if (props.coords.length === 1) {
            setDrawMode(false);
            const start = props.coords[0]; 
            const end = [x, y];             
            props.setCoords([start, end]);

            const rectX = Math.min(start[0], end[0]);
            const rectY = Math.min(start[1], end[1]);
            const rectWidth = Math.abs(start[0] - end[0]);
            const rectHeight = Math.abs(start[1] - end[1]);

            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            ctx.strokeStyle = "red";
            ctx.lineWidth = 2;
            ctx.strokeRect(rectX, rectY, rectWidth, rectHeight);
        } else if (props.coords.length > 1) {
            props.setCoords([[x, y]]);
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
        img.src = props.imagePath;

        img.onload = function () {
            props.setDimensions([img.height, img.width]);

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
                let startX = props.coords[0][0];
                let startY = props.coords[0][1];
                let mouseX =
                    ((e.clientX - canvasRect.left) / canvasRect.width) * canvas.width;
                let mouseY =
                    ((e.clientY - canvasRect.top) / canvasRect.height) * canvas.height;
                ctx.strokeRect(startX, startY, mouseX - startX, mouseY - startY);
            }
            catch {
                
            }
        };
    }

    return (
        <div id="ImageDisplayDiv">
            {props.imagePath ? (
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
