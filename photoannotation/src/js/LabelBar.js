import React, { useRef, useState } from 'react';

function LabelBar(props) {

    const [label, setLabel] = useState("default");
    const [depth, setDepth] = useState("3");

    function downloadImageXML() {
        let xmltext =
        `
        <annotation>
            <size>
                <width>${props.dimensions[1]}</width>
                <height>${props.dimensions[0]}</height>
                <depth>${depth}</depth>
            </size>
            <object>
                <name>${label}</name>
                <bndbox>
                    <xmin>${props.coords[0][0]}</xmin>
                    <ymin>${props.coords[0][1]}</ymin>
                    <xmax>${props.coords[1][0]}</xmax>
                    <ymax>${props.coords[1][1]}</ymax>
                </bndbox>
            </object>
        </annotation>
        `

        let filename = props.imageName + crypto.randomUUID();
        let pom = document.createElement('a');
        let bb = new Blob([xmltext], {type: 'text/plain'});

        pom.setAttribute('href', window.URL.createObjectURL(bb));
        pom.setAttribute('download', filename);

        pom.dataset.downloadurl = ['text/plain', pom.download, pom.href].join(':');
        pom.draggable = true; 
        pom.classList.add('dragout');
        pom.click();
    }

    return <div id="LabelBarDiv">
        {props.coords == null || props.coords.length == 0 || props.coords.length == 1
            ? <></> :
            <div id="LabelBarContents">
                <p id="BoundingCoordinatesTitle">Bounding Coordinates</p>
                <p className = "CoordinateLabel">X1 Coordinate</p><input className = "CoordinateInput" value={props.coords[0][0]}></input>
                <p className = "CoordinateLabel">y1 Coordinate</p><input className = "CoordinateInput" value={props.coords[0][1]}></input>
                <p className = "CoordinateLabel">X2 Coordinate</p><input className = "CoordinateInput" value={props.coords[1][0]}></input>
                <p className = "CoordinateLabel">Y2 Coordinate</p><input className = "CoordinateInput" value={props.coords[1][1]}></input>
                <p className="CoordinateLabel">Enter a label</p><input onChange={(e) => setLabel(e.target.value)} className="CoordinateInput"></input>
                <p className = "CoordinateLabel">Enter image depth</p><input onChange={(e) => setDepth(e.target.value)} className = "CoordinateInput"></input>
                <button id="DownloadXMLButton" onClick={downloadImageXML}>Download XML Sheet For Image</button>
            </div>
        }
    </div>
}

export default LabelBar;
