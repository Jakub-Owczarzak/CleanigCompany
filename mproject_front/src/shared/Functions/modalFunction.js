const modalOpenHandler = (
  modalStatus,
  dispatch,
  actionCreator,
  modalType,
  data
) => {
  if (modalStatus === false && modalType === 'deleteItem') {
    console.log(data);
    dispatch(actionCreator.openDeleteItemModal(modalType, data));
  }
  if (modalStatus === false && modalType === 'placeInfo') {
    dispatch(actionCreator.modalPlaceOpen(modalType, data));
  }
  if (modalStatus === false && modalType === 'info') {
    dispatch(actionCreator.openInfoModal(modalType, data));
  }

  if (modalStatus === true) {
    dispatch(actionCreator.modalClose());
  }
};

export { modalOpenHandler };
