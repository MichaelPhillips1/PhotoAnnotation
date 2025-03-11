import store from './store';
import DeleteIcon from '@mui/icons-material/Delete';

function LabelBarItem(props) {

    function handleDelete(id) {
        store.dispatch({type: 'remove/boundingBoxes', payload: id})
    }
    return <div className="LabelBarItem">
        <p className="LabelBarCoordText">(X1,Y1) Coordinates:</p>
        <p className="LabelBarCoordText">({parseFloat(props.boundingBox[0][0].toFixed(2))}, {parseFloat(props.boundingBox[0][1].toFixed(2))})</p>
        <p className="LabelBarCoordText">(X2, Y2) Coordinates:</p>
        <p className="LabelBarCoordText">({parseFloat(props.boundingBox[1][0].toFixed(2))}, {parseFloat(props.boundingBox[1][1].toFixed(2))})</p>
        <button className="DeleteEntryButton" onClick={() => handleDelete(props.boundingBox[2])}><DeleteIcon className="DeleteEntryIcon" /> <p className="DeleteEntryText">Delete Entry #{props.boundingBox[2]}</p></button>
    </div>
}

export default LabelBarItem