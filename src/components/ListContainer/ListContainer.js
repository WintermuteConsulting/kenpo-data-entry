import { connect } from 'react-redux';
import setSelection from '../../actions/actions';
import ListBox from '../ListBox/ListBox';

const mapStateToProps = ({ selection, data }) => (
  {
    options: Object.keys(data).map(key => ({ id: key, text: data[key].title })),
    value: selection,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onChange: (id) => {
      dispatch(setSelection(id));
    },
  }
);

const ListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListBox);

export default ListContainer;
