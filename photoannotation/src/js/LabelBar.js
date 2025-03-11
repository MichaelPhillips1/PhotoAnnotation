import React, { useEffect, useState } from 'react';
import store from './store';
import { useSelector } from 'react-redux';
import LabelBarItem from './LabelBarItem';

function LabelBar() {

    const [label, setLabel] = useState("default");
    const [depth, setDepth] = useState("3");
    const [labelItems, setLabelItems] = useState([])
    const boundingBoxes = useSelector(state => state.boundingBoxes)
    const imageDimensions = useSelector(state => state.imageDimensions)
    const imageName = useSelector(state => state.imageName)

    function downloadImageXML() {
        let xmltext =
        `
        <annotation>
            <size>
                <width>${imageDimensions[1]}</width>
                <height>${imageDimensions[0]}</height>
                <depth>${depth}</depth>
            </size>
            <name>${label}</name>
        `

        boundingBoxes.forEach(element => {
            xmltext += 
                `\n<object>
                <bndbox>
                    <xmin>${element[0][0]}</xmin>
                    <ymin>${element[0][1]}</ymin>
                    <xmax>${element[1][0]}</xmax>
                    <ymax>${element[1][1]}</ymax>
                </bndbox>
            </object>`
        })

        xmltext += `\n</annotation>`

        let filename = imageName + "-" + label + "-" + crypto.randomUUID();
        let pom = document.createElement('a');
        let bb = new Blob([xmltext], {type: 'text/plain'});

        pom.setAttribute('href', window.URL.createObjectURL(bb));
        pom.setAttribute('download', filename);

        pom.dataset.downloadurl = ['text/plain', pom.download, pom.href].join(':');
        pom.draggable = true; 
        pom.classList.add('dragout');
        pom.click();
    }

    useEffect(() => {
        let tempLabelItems = []
        boundingBoxes.forEach(element => {
            let tempItem = <LabelBarItem boundingBox={element}></LabelBarItem>
            tempLabelItems.push(tempItem)
        });
        setLabelItems(tempLabelItems)
    }, [boundingBoxes])

    return <div id="LabelBarDiv">
        {boundingBoxes.length >= 1 ?
            <div id="LabelBarContents">
                <p id="ActiveLabelHeader">Active Labels</p>
                <div id="LabelBarTable">
                    {labelItems}
                </div>
                <p className="CoordinateLabel">Enter a label</p><input onChange={(e) => setLabel(e.target.value)} className="LabelInput"></input>
                <p className="CoordinateLabel">Enter image depth</p><input onChange={(e) => setDepth(e.target.value)} className="LabelInput"></input>
                <button id="DownloadXMLButton" onClick={downloadImageXML}>Download XML Sheet For Image</button>
            </div> : <></>}
        </div>
}

export default LabelBar;
