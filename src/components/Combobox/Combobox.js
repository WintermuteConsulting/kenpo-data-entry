import React from 'react';

class Combobox extends React.Component {
  constructor(props) {
    super(props);

    if (props.selected !== '') {
      this.state = { selected: props.selected };
    } else {
      this.state = { selected: props.options[0] };
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ selected: event.target.value });
  }

  render() {
    /* eslint-disable react/no-array-index-key */
    // options are static, do not have an id, and are never reordered
    return (
      <select value={this.state.selected} onChange={this.handleChange}>
        { this.props.options.map((text, i) => <option key={i} value={text}>{text}</option>) }
      </select>
    );
    /* eslint-enable react/no-array-index-key */
  }
}

Combobox.propTypes = {
  options: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  selected: React.PropTypes.string,
};

Combobox.defaultProps = {
  selected: '',
};

export default Combobox;
