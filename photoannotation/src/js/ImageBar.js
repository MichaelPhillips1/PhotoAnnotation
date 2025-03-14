import DownloadIcon from '@mui/icons-material/Download';
import ImageBarItem from './ImageBarItem';
import React, { useRef, useState } from 'react';
import store from './store';

function ImageBar() {
    const [ImageBarItems, setImageBarItems] = useState([]);
    const fileInputRef = useRef(null);

    const handleFileUploadClick = () => {
        fileInputRef.current.click();
    }
    const handleFileChanges = (e) => {
        store.dispatch({ type: 'set/imagePath', payload: null })
        store.dispatch({ type: 'set/imageDimensions', payload: null })
        store.dispatch({ type: 'set/imageName', payload: null })
        store.dispatch({type: 'clear/boundingBoxes'})
        let ImageBarItemHolder = [];
        Array.from(e.target.files).forEach((element, index) => {
            let imageUrl = URL.createObjectURL(element);
            let tempBarItemElement = <ImageBarItem onClick={() => imageClicked(element.name, imageUrl)} imagePath={imageUrl} imageName={element.name} key={index} />
            ImageBarItemHolder.push(tempBarItemElement)
        });
        setImageBarItems(ImageBarItemHolder)
    }

    const imageClicked = (image, url) => {
        store.dispatch({type: 'set/imagePath', payload: url})
        store.dispatch({ type: 'clear/boundingBoxes' })
        store.dispatch({type: 'set/imageName', payload: image})
    }

    return <div id="ImageBarDiv">
        <button id="ImportImagesButton" onClick={handleFileUploadClick}>
            <input type="file" style={{ display: 'none' }} ref={fileInputRef} onChange={handleFileChanges} multiple accept="image/*"/>
            <DownloadIcon /><p id="ImportImagesLabel">Import Images</p>
        </button>
        <div id="ImageBarList">
            {ImageBarItems}
        </div>
    </div>
}

export default ImageBar;
