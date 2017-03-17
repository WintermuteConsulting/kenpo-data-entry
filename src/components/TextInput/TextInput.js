import React from 'react';

function TextInput({ value, onChange }) {
  return <input type="text" value={value} onChange={onChange} />;
}

TextInput.propTypes = {
  value: React.PropTypes.string,
  onChange: React.PropTypes.func,
};

TextInput.defaultProps = {
  value: '',
  onChange: undefined,
};

export default TextInput;
