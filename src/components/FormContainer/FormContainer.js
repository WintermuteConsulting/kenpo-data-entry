import { connect } from 'react-redux';
import { updateItem } from '../../actions/actions';
import TechniqueForm from '../TechniqueForm/TechniqueForm';

const mapStateToProps = ({ selection, data }) => (
  {
    id: selection,
    initialData: data[selection],
  }
);

const mapDispatchToProps = dispatch => (
  {
    onSubmit: (id, datum) => dispatch(updateItem(id, datum)),
  }
);

const FormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TechniqueForm);

export default FormContainer;
