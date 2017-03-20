import { connect } from 'react-redux';
import setSelection from '../../actions/actions';
import Option from '../Option/Option';

const mapStateToProps = ({ selection, data }) => (
  {
    options: Object.keys(data).map(key => ({ id: key, text: data[key].title })),
    value: selection,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onChange: (e) => {
      const id = e.target.value;
      dispatch(setSelection(id));
    },
  }
);

const ListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Option);

export default ListContainer;
