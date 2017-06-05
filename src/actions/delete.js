export function deleteSuccess(path) {
  return {
    type: 'DELETE_SUCCESS',
    path,
  };
}

export function deleteFailure(path, error) {
  return {
    type: 'DELETE_FAILURE',
    path,
    error,
  };
}

export default function deleteItem(path) {
  return (dispatch) => {
    fetch(`${path.collection}/${path.item}`, { method: 'DELETE' })
    .then((res) => {
      if (res.ok) {
        dispatch(deleteSuccess(path));
        return;
      }
      dispatch(deleteFailure(path));
    })
    .catch(err => dispatch(deleteFailure(path, err)));
  };
}
