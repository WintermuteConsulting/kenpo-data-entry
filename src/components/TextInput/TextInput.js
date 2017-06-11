import React from 'react';

function TextInput({ id, value, onChange }) {
  return <input id={id} type="text" value={value} onChange={e => onChange(e.target.value)} />;
}

TextInput.propTypes = {
  id: React.PropTypes.string,
  value: React.PropTypes.string,
  onChange: React.PropTypes.func,
};

TextInput.defaultProps = {
  id: undefined,
  value: '',
  onChange: undefined,
};

export default TextInput;
