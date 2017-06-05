import React from 'react';
import ListContainer from '../ListContainer/ListContainer';
import FormContainer from '../FormContainer/FormContainer';
import ButtonContainer from '../ButtonContainer/ButtonContainer';

function App(props) {
  const { path, handleCreate, handleDelete } = props;
  return (
    <div style={{ display: 'flex' }}>
      <div>
        <div><ListContainer path={path} /></div>
        <ButtonContainer action={handleCreate}>＋</ButtonContainer>
        <ButtonContainer action={handleDelete}>－</ButtonContainer>
      </div>
      <FormContainer path={path} />
    </div>
  );
}

App.propTypes = {
  path: React.PropTypes.objectOf(React.PropTypes.string).isRequired,
  handleCreate: React.PropTypes.func.isRequired,
  handleDelete: React.PropTypes.func.isRequired,
};

export default App;
