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

export default function TechniqueForm(props) {
  const { value, handleChange, id } = props;
  return (
    <form id={id}>
      <fieldset key={ids.title}>
        <label htmlFor={ids.title}>title</label>
        <TextInput id={ids.title} value={value.title} onChange={handleChange('title')} />
      </fieldset>
      <fieldset key={ids.attack}>
        <label htmlFor={ids.attack}>attack</label>
        <TextInput id={ids.attack} value={value.attack} onChange={handleChange('attack')} />
      </fieldset>
    </form>
  );
}

TechniqueForm.propTypes = {
  value: React.PropTypes.shape({
    title: React.PropTypes.string,
    attack: React.PropTypes.string,
  }).isRequired,
  handleChange: React.PropTypes.func.isRequired,
  id: React.PropTypes.string,
};

TechniqueForm.defaultProps = {
  id: null,
};
