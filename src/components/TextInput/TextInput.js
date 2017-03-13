import React from 'react';

class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value };
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return <input type="text" value={this.state.value} onChange={this.onChange} />;
  }
}

TextInput.propTypes = {
  value: React.PropTypes.string,
};

TextInput.defaultProps = {
  value: '',
};

export default TextInput;
