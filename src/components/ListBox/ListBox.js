import React from 'react';

function ListBox({ options, value, onChange }) {
  const size = (options.length > 2) ? options.length : 2;
  return (
    <select size={size} value={value} onChange={onChange}>
      {options.map(o => <option key={o.id} value={o.id}>{o.text}</option>)}
    </select>
  );
}

ListBox.propTypes = {
  options: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.string,
    text: React.PropTypes.string,
  })),
  value: React.PropTypes.string,
  onChange: React.PropTypes.func,
};

ListBox.defaultProps = {
  options: [],
  value: '',
  onChange: undefined,
};

export default ListBox;
