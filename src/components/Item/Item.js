import React from 'react';
import hash from 'string-hash';
import Button from '../Button/Button';
import TechniqueForm from '../TechniqueForm/TechniqueForm';

export const ids = { form: hash('item-form').toString() };

export default class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.initialState;
  }

  render() {
    const { handleSave, handleDelete, path } = this.props;
    const setter = key => value => this.setState({ [key]: value });
    return (
      <div>
        <Button form={ids.form} type="submit" onClick={handleSave(path, this.state)}>Save</Button>
        <Button form={ids.form} onClick={handleDelete(path)}>Delete</Button>
        <TechniqueForm id={ids.form} value={this.state} handleChange={setter} />
      </div>
    );
  }
}

Item.propTypes = {
  initialState: React.PropTypes.objectOf(React.PropTypes.string).isRequired,
  handleSave: React.PropTypes.func.isRequired,
  handleDelete: React.PropTypes.func.isRequired,
  path: React.PropTypes.objectOf(React.PropTypes.string).isRequired,
};
