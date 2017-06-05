export function createSuccess(path, datum) {
  return {
    type: 'CREATE_SUCCESS',
    path,
    datum,
  };
}

export function createFailure(path, error) {
  return {
    type: 'CREATE_FAILURE',
    path,
    error,
  };
}

export default function createItem(path, datum) {
  const init = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datum),
  };

  return (dispatch) => {
    fetch(path.collection, init)
    .then((res) => {
      if (res.ok) {
        const id = res.headers.get('Location');
        const newPath = { collection: path.collection, item: id };
        dispatch(createSuccess(newPath, datum));
        return;
      }
      dispatch(createFailure(path));
    })
    .catch(err => dispatch(createFailure(path, err)));
  };
}
