import React from 'react';
import ListContainer from '../ListContainer/ListContainer';
import FormContainer from '../FormContainer/FormContainer';
import ButtonContainer from '../ButtonContainer/ButtonContainer';
import { createItem, deleteSelectedItem } from '../../actions/actions';

function App() {
  return (
    <div style={{ display: 'flex' }}>
      <div>
        <div><ListContainer /></div>
        <ButtonContainer action={createItem}>＋</ButtonContainer>
        <ButtonContainer action={deleteSelectedItem}>－</ButtonContainer>
      </div>
      <FormContainer />
    </div>
  );
}

export default App;
