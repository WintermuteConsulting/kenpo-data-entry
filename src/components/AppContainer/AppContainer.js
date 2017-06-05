import { connect } from 'react-redux';
import { getPath } from '../../selectors/getters';
import Technique from '../../data/technique';
import createItem from '../../actions/create';
import deleteItem from '../../actions/delete';
import App from '../App/App';

const mapStateToProps = (state) => {
  const path = getPath(state);
  return {
    path,
    handleCreate: () => createItem(path, new Technique()),
    handleDelete: () => deleteItem(path),
  };
};

const AppContainer = connect(
  mapStateToProps,
)(App);

export default AppContainer;
