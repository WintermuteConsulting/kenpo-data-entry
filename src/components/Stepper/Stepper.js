import React from 'react';

class Stepper extends React.Component {
  constructor(props) {
    super(props);

    // clamp the start value to [min, max]
    if (props.start >= props.min && props.start <= props.max) {
      this.state = { value: props.start };
    } else {
      this.state = { value: props.min };
    }
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    // clamp the value - it might be pasted in
    let input = event.target.value;
    if (input < this.props.min) {
      input = this.props.min;
    } else if (input > this.props.max) {
      input = this.props.max;
    }

    this.setState({ value: input });
  }

  render() {
    return (
      <input
        type="number"
        value={this.state.value}
        min={this.props.min}
        max={this.props.max}
        step={this.props.step}
        onChange={this.onChange}
      />);
  }
}

Stepper.propTypes = {
  min: React.PropTypes.number.isRequired,
  max: React.PropTypes.number.isRequired,
  step: React.PropTypes.number.isRequired,
  start: React.PropTypes.number,
};

// why -∞? if no start value is supplied, we don't want to choose a value (say, 0)
// that could fall within an actual range (say, [-5, 5]). Keep in mind that the value
// of the stepper won't be set to infinity - it will be clamped to the minimum.
Stepper.defaultProps = {
  start: Number.NEGATIVE_INFINITY,
};

export default Stepper;
