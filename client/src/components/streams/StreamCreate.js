import React from "react";
import {
  Field,
  reduxForm
} from "redux-form"; /* (228)
Field - React component, reduxForm - connect function for 
action creator and mapstate to props*/

class StreamCreate extends React.Component {
  //(234)
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }
  /*renderInput(formProps) {
    (229)replace argument forProps with input*/
  // (230) add label property
  // (233) add meta
  renderInput = ({ input, label, meta }) => {
    let className = `field ${meta.error && meta.touched ? "error" : ""}`;
    //(229)
    //console.log(formProps);
    console.log(meta); // (234) возвращает meta.error
    return (
      /* (229) replace with shorten syntax
        <input onChange={formProps.input.onChange}
        value={formProps.input.value} />
      add all input staff value to key prop */
      /*<input {...formProps.input} />*/
      //destructure input
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {/*<div>{meta.error}</div>*/}
        {this.renderError(meta)} {/*(234)*/}
      </div>
    );
  };
  /* (231) redux сам прерывает перезагрузку, нет необходимости прописывать
  onSubmit(event) {
    event.preventDefault();
  получим значения Field черех props formValues 
  {title: "sdgf", description: "tyhj"} */
  onSubmit(formValues) {
    console.log(formValues);
  }

  render() {
    //console.log(this.props); //(228)
    return (
      <div>
        <form
          onSubmit={this.props.handleSubmit(
            this.onSubmit
          )} /*(231) add handleSubmit from props. onSubmit - our method */
          className="ui form error"
        >
          <Field
            name="title"
            component={this.renderInput}
            label="Enter Title"
          />{" "}
          {/*(228) Field for the user input, name prop is required */}
          <Field
            name="description"
            component={this.renderInput}
            label="Enter Description"
          />
          <button className="ui button primary">Submit</button>
        </form>
      </div>
    );
  }
}

/*(232) forms validation */
const validate = formValues => {
  const errors = {};
  if (!formValues.title) {
    //only ran if user didnt input title
    errors.title = "Please enter a title";
  }
  if (!formValues.description) {
    errors.description = "Please enter a description";
  }
  return errors;
};

export default reduxForm({
  form: "streamCreate",
  validate
})(StreamCreate);
