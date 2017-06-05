import { connect } from 'react-redux';
import updateItem from '../../actions/update';
import { getItem } from '../../selectors/getters';
import TechniqueForm from '../TechniqueForm/TechniqueForm';

const mapStateToProps = (state, { path }) => (
  {
    initialData: getItem(state, path),
  }
);

const mapDispatchToProps = (dispatch, { path }) => (
  {
    onSubmit: datum => dispatch(updateItem(path, datum)),
  }
);

const FormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TechniqueForm);

export default FormContainer;
