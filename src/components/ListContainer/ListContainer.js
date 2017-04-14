import { connect } from 'react-redux';
import { view } from 'ramda';
import { setItem } from '../../actions/actions';
import Option from '../Option/Option';
import { lens, getData } from '../../data/state';

const mapStateToProps = (state) => {
  const collection = view(lens.collection, state);
  const item = view(lens.item, state);
  const data = getData(collection, state);
  return {
    options: Object.keys(data).map(key => ({ id: key, text: data[key].title })),
    value: item,
  };
};

const mapDispatchToProps = dispatch => (
  {
    onChange: (e) => {
      const id = e.target.value;
      dispatch(setItem(id));
    },
  }
);

const ListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Option);

export default ListContainer;
