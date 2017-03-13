import React from 'react';

function Button(props) {
  return <button type="button" onClick={props.onClick}>{props.children}</button>;
}

Button.propTypes = {
  onClick: React.PropTypes.func,
  children: React.PropTypes.node,
};

Button.defaultProps = {
  onClick: () => {},
  children: undefined,
};

export default Button;
