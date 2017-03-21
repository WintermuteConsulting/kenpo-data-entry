import { connect } from 'react-redux';
import Button from '../Button/Button';

const mapDispatchToProps = (dispatch, { action }) => (
  {
    onClick: () => {
      dispatch(action());
    },
  }
);

const ButtonContainer = connect(
  null,
  mapDispatchToProps,
)(Button);

export default ButtonContainer;
