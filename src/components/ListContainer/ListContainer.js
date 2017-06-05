import { connect } from 'react-redux';
import { getCollection } from '../../selectors/getters';
import changePath from '../../actions/path';
import Option from '../Option/Option';

const mapStateToProps = (state, { path }) => {
  const data = getCollection(state, path);
  return {
    options: Object.keys(data).map(key => ({ id: key, text: data[key].title })),
    value: path.item || '',
  };
};

const mapDispatchToProps = (dispatch, { path }) => (
  {
    onChange: (e) => {
      const id = e.target.value;
      dispatch(changePath({ collection: path.collection, item: id }));
    },
  }
);

const ListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Option);

export default ListContainer;
