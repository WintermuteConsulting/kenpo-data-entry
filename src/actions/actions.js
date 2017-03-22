export const setSelection = id => ({ type: 'SET_SELECTION', id });
export const createItem = () => ({ type: 'CREATE_ITEM' });
export const updateItem = (id, datum) => ({ type: 'UPDATE_ITEM', id, datum });
export const deleteItem = () => ({ type: 'DELETE_ITEM' });
