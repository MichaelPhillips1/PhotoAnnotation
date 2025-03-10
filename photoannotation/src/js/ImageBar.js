import DownloadIcon from '@mui/icons-material/Download';
import ImageBarItem from './ImageBarItem';
import React, { useRef, useState } from 'react';

function ImageBar(props) {

    const [ImageBarItems, setImageBarItems] = useState([]);
    const fileInputRef = useRef(null);

    const handleFileUploadClick = () => {
        fileInputRef.current.click();
    }
    const handleFileChanges = (e) => {
        let ImageBarItemHolder = [];
        Array.from(e.target.files).forEach((element, index) => {
            let imageUrl = URL.createObjectURL(element);
            let tempBarItemElement = <ImageBarItem onClick={() => imageClicked(element.name, imageUrl)} imagePath={imageUrl} imageName={element.name} key={index} />
            ImageBarItemHolder.push(tempBarItemElement)
        });
        setImageBarItems(ImageBarItemHolder)
    }

    const imageClicked = (image, url) => {
        props.setImagePath(url)
        props.setCoords([])
        props.setImageName(image)
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
