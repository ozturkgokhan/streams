import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {
  renderError({error, touched}) {
    if(touched && error){
      return(
        <div className="ui error message">
          {error}
        </div>
      )
    }
  }
  
  renderInput = ({input, label, meta}) => {
    const customClassName = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return(
      <div className={customClassName}>
        <label className="header">{label}</label>
        <input data-cy={input.name} {...input} autoComplete="off"/>
        {this.renderError(meta)}
      </div>
    ) 
  }
  
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  }

  render(){
    return(
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
        <Field name="title" 
               component={this.renderInput}
               label="Enter title"/>
        <Field name="description"
               component={this.renderInput}
               label="Enter description"/> 
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
};

const validate = formValues => {
  const errors = {};

  if(!formValues.title){
    errors.title = 'Title can not be blank'
  }

  if(!formValues.description){
    errors.description = 'Description can not be blank'
  }

  return errors;
}

export default reduxForm({
  form: 'streamForm',
  validate
})(StreamForm);

