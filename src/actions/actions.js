export const setCollection = name => ({ type: 'SET_COLLECTION', name });
export const setItem = id => ({ type: 'SET_ITEM', id });
export const createItem = () => ({ type: 'CREATE_ITEM', id: Date.now().toString() });
export const updateSelectedItem = datum => ({ type: 'UPDATE_SELECTED_ITEM', datum });
export const deleteSelectedItem = () => ({ type: 'DELETE_SELECTED_ITEM' });
