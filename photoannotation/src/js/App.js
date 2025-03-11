
import React, { useState } from 'react';
import HeaderBar from './HeaderBar';
import ImageBar from './ImageBar'
import ImageDisplay from './ImageDisplay';
import LabelBar from './LabelBar'

function App() {
    const [imagePath, setImagePath] = useState(null);
    const [coords, setCoords] = useState([]);
    const [dimensions, setDimensions] = useState([]);
    const [imageName, setImageName]= useState(null)

    return <>
        <HeaderBar />
        <div id='BodyContainerDiv'>
            <ImageBar />
            <ImageDisplay />
            <LabelBar />
        </div>
    </>
}

export default App;