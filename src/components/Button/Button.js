import React from 'react';

function Button(props) {
  const { type, form, onClick, children } = props;
  return <button type={type} form={form} onClick={onClick}>{children}</button>;
}

Button.propTypes = {
  type: React.PropTypes.string,
  form: React.PropTypes.string,
  onClick: React.PropTypes.func,
  children: React.PropTypes.node,
};

Button.defaultProps = {
  type: 'button',
  form: null,
  onClick: null,
  children: null,
};

export default Button;
