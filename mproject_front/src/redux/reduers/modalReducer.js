import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isOpen: false,
  data: {},
  modalType: '',
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CLOSE_MODAL:
      return {
        ...state,
        isOpen: false,
        data: {},
        modalType: '',
      };

    case actionTypes.OPEN_PLACE_MODAL:
      return {
        ...state,
        isOpen: true,
        data: {
          adress: action.payload.data.adress,
          coordinates: action.payload.data.coordinates,
        },
        modalType: action.payload.modalType,
      };

    case actionTypes.OPEN_DELETE_ITEM_MODAL:
 
      return {
        ...state,
        isOpen: true,
        data: {
          itemID: action.payload.data.itemID,
          imageUrl: action.payload.data.imageUrl,
          info: action.payload.data.info,
        },
        modalType: action.payload.modalType,
      };
    case actionTypes.OPEN_INFO_MODAL:

      return {
        ...state,
        isOpen: true,
        data: {
          message: action.payload.data,
        },
        modalType: action.payload.modalType,
      };

    default:
      return {
        ...state,
      };
  }
};

export default modalReducer;
