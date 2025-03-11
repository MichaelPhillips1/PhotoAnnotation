import { createStore } from 'redux';

const initialState = {
      boundingBoxes: [],
      bboxIdCounter: 0,
      imagePath: null,
      imageDimensions: [],
      imageName: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
      case 'add/boundingBoxes':
            return { ...state, boundingBoxes: [...state.boundingBoxes, action.payload], bboxIdCounter: state.bboxIdCounter + 1 };
      case 'remove/boundingBoxes':
            let tempBoundingBoxes = [];
            state.boundingBoxes.forEach(element => {
                  if (element[2] != action.payload) {
                        tempBoundingBoxes.push(element)
                  }
            });
            return { ...state, boundingBoxes: tempBoundingBoxes }
      case 'clear/boundingBoxes':
            return { ...state, boundingBoxes: [], bboxIdCounter: 0 };
      case 'set/imagePath':
              return { ...state, imagePath: action.payload };
      case 'set/imageDimensions':
            return { ...state, imageDimensions: action.payload };
      case 'set/imageName':
            return { ...state, imageName: action.payload };
      default:
            return state;
  }
};

const store = createStore(reducer);

export default store;