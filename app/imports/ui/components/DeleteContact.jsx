import React from 'react';
import { Contacts, ContactSchema } from '/imports/api/contact/contact';
import { Segment } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import DeleteField from 'uniforms-semantic/DeleteField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Bert } from 'meteor/themeteorchef:bert';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';

/** Renders the Page for adding a document. */
class DeleteContact extends React.Component {

  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
    this.formRef = null;
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Delete contact failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Delete contact succeeded' });
      this.formRef.reset();
    }
  }

  /** On submit, insert the data. */
  submit(data) {
    const { firstName, lastName, address, image, description } = data;
    const owner = Meteor.user().username;
    Contacts.remove({ firstName, lastName, address, image, description, owner }, this.deleteCallback);
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (
        <AutoForm ref={(ref) => {
          this.formRef = ref;
        }} schema={ContactSchema} onSubmit={this.submit}>
          <Segment>
            <DeleteField value='Delete'/>
            <ErrorsField/>
            <HiddenField name='firstName' value={this.props.firstName}/>
            <HiddenField name='lastName' value={this.props.lastName}/>
            <HiddenField name='address' value={this.props.address}/>
            <HiddenField name='image' value={this.props.image}/>
            <HiddenField name='description' value={this.props.description}/>
            <HiddenField name='owner' value={this.props.owner}/>
            <HiddenField name='contactId' value={this.props.contactId}/>
          </Segment>
        </AutoForm>
    );
  }
}

DeleteContact.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  contactId: PropTypes.string.isRequired
};

export default DeleteContact;
