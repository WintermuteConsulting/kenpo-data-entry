import React from 'react';

class ListBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    const options = this.props.options;
    const size = (options.length > 2) ? options.length : 2;
    return (
      <select size={size} value={this.state.value} onChange={this.handleChange}>
        {options.map(data => <option key={data.id} value={data.value}>{data.value}</option>)}
      </select>
    );
  }
}

ListBox.propTypes = {
  options: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.string,
    value: React.PropTypes.string,
  })),
  value: React.PropTypes.string,
};

ListBox.defaultProps = {
  options: [],
  value: undefined,
};

export default ListBox;
