import React from 'react';
import hash from 'string-hash';
import TextInput from '../TextInput/TextInput';

// Labels should identify their corresponding element with a 'for' attribute.
// This requires an 'id' applied to the form element, but we don't want the 'id'
// to collide with anything outside this component, so we hash the field name
// with the form name.
export const ids = {
  title: hash('technique-title').toString(),
  attack: hash('technique-attack').toString(),
};

class TechniqueForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.initialData;
  }

  componentWillReceiveProps(props) {
    this.setState(props.initialData);
  }

  makeHandler(key) {
    return event => this.setState({ [key]: event.target.value });
  }

  render() {
    const onClick = handler => ((e) => { e.preventDefault(); handler(this.state); });
    return (
      <form>
        <button type="submit" onClick={onClick(this.props.onSubmit)}>Save</button>
        <fieldset key={ids.title}>
          <label htmlFor={ids.title}>title</label>
          <TextInput id={ids.title} value={this.state.title} onChange={this.makeHandler('title')} />
        </fieldset>
        <fieldset key={ids.attack}>
          <label htmlFor={ids.attack}>attack</label>
          <TextInput id={ids.attack} value={this.state.attack} onChange={this.makeHandler('attack')} />
        </fieldset>
      </form>
    );
  }
}

TechniqueForm.propTypes = {
  initialData: React.PropTypes.shape({
    title: React.PropTypes.string,
    attack: React.PropTypes.string,
  }),
  onSubmit: React.PropTypes.func,
};

TechniqueForm.defaultProps = {
  initialData: { title: '', attack: '' },
  onSubmit: undefined,
};

export default TechniqueForm;
