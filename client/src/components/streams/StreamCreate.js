import React from "react";
import {
  Field,
  reduxForm
} from "redux-form"; /* (228)
Field - React component, reduxForm - connect function for 
action creator and mapstate to props*/

class StreamCreate extends React.Component {
  render() {
    //console.log(this.props); //(228)
    return (
      <div>
        <form>
          <Field name="title" />{" "}
          {/* Field for the user input, name prop is required */}
          <Field name="description" />
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: "streamCreate"
})(StreamCreate);
