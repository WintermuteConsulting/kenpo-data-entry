import React from 'react';

function Option({ type, options, value, onChange }) {
  let size;
  switch (type) {
    case 'dropdown':
      size = 1;
      break;

    case 'list':
    default:
      size = options.length > 2 ? options.length : 2;
  }

  return (
    <select size={size} value={value} onChange={onChange}>
      {options.map(o => <option key={o.id} value={o.id}>{o.text}</option>)}
    </select>
  );
}

Option.propTypes = {
  type: React.PropTypes.string,
  options: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.string,
    text: React.PropTypes.string,
  })),
  value: React.PropTypes.string,
  onChange: React.PropTypes.func,
};

Option.defaultProps = {
  type: 'list',
  options: [],
  value: '',
  onChange: undefined,
};

export default Option;
