/*(266) refactor with streamForm */
import React from "react"; //(228)
import { connect } from "react-redux"; //239
import { createStream } from "../../actions"; //239
import StreamForm from "./streamForm";

class StreamCreate extends React.Component {
  onSubmit = formValues => {
    //console.log(formValues);
    /* (240) make sure we get formValues as argument */
    this.props.createStream(formValues);
  };

  render() {
    //console.log(this.props); //(228)
    return (
      <div>
        <h3>Create a Stream</h3>
        <StreamForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(null, { createStream })(StreamCreate);
