
function ImageBarItem(props) {
    return <div onClick={props.onClick} className="ImageBarItem">
        <img className="ImageBarItemIcon" src={props.imagePath}></img><p>{props.imageName}</p>
    </div>
}

export default ImageBarItem