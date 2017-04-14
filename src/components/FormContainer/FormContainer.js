import { connect } from 'react-redux';
import { view } from 'ramda';
import { updateSelectedItem } from '../../actions/actions';
import { lens } from '../../data/state';
import TechniqueForm from '../TechniqueForm/TechniqueForm';

const mapStateToProps = (state) => {
  const collection = view(lens.collection, state);
  const item = view(lens.item, state);
  return {
    initialData: view(lens.datum(collection, item), state),
  };
};

const mapDispatchToProps = dispatch => (
  {
    onSubmit: datum => dispatch(updateSelectedItem(datum)),
  }
);

const FormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TechniqueForm);

export default FormContainer;
