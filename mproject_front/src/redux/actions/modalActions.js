import * as actionTypes from './actionTypes';

const modalPlaceOpen = (modalType, data) => {
  return {
    type: actionTypes.OPEN_PLACE_MODAL,
    payload: {
      modalType,
      data,
    },
  };
};

const openDeleteItemModal = (modalType, data) => {
  console.log(data);
  return {
    type: actionTypes.OPEN_DELETE_ITEM_MODAL,
    payload: {
      modalType,
      data,
    },
  };
};
const openInfoModal = (modalType, data) => {
  console.log('AKCJA INFO', data, modalType);
  return {
    type: actionTypes.OPEN_INFO_MODAL,
    payload: {
      modalType,
      data,
    },
  };
};

const modalClose = () => {
  return {
    type: actionTypes.CLOSE_MODAL,
  };
};

export { modalPlaceOpen, modalClose, openDeleteItemModal, openInfoModal };
