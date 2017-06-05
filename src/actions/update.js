export function updateSuccess(path, datum) {
  return {
    type: 'UPDATE_SUCCESS',
    path,
    datum,
  };
}

export function updateFailure(path, error) {
  return {
    type: 'UPDATE_FAILURE',
    path,
    error,
  };
}

export default function updateItem(path, datum) {
  const init = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datum),
  };

  return (dispatch) => {
    fetch(`${path.collection}/${path.item}`, init)
    .then((res) => {
      if (res.ok) {
        dispatch(updateSuccess(path, datum));
        return;
      }
      dispatch(updateFailure(path));
    })
    .catch(err => dispatch(updateFailure(path, err)));
  };
}
