import React from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions"; //(264), (267) added editStream
import StreamForm from "./streamForm";
import _ from "lodash";
/*(264) StreamList replace with class component  
let StreamEdit = props => {
  console.log(props);*/
class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  /*(267) add onSubmit. formValues from action editStream */
  onSubmit = formValues => {
    //console.log("formvalues", formValues);
    /*(268) fromValues contain id and userID which shouldnt be changed,
    form.StreamForm.values */
    this.props.editStream(this.props.match.params.id, formValues);
  };

  render() {
    console.log(this.props);
    /*(261) props are coming from react router dom 
  Route from App.
  (263)stream is undefined with first loading. 
  data wasnt fetched in redux store from streamList
   */
    /*(264) while stream data is not fetched its error of undefined.
  add if not */
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }
    return (
      //(267) add initialValues. title and description are from Field name
      <div>
        <h3>Edit a Stream</h3>
        <StreamForm
          initialValues={
            /*{{title: this.props.stream.title,
            description: this.props.stream.description}}*/
            /*(267)stream contain title and description
            this.props.stream */
            /*(268) need only title and description tu update, 
            but not id and userId. use lodash pick */
            _.pick(this.props.stream, "title", "description") //now in form.StreamForm.values only t and d
          }
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

/*(260) ownProps of state are the same, as props from Route */
let mapStateToProps = (state, ownProps) => {
  //console.log(ownProps);
  /*(262) streams are stored inredux as object */
  return { stream: state.streams[ownProps.match.params.id] };
};

//(267) add editStream action
export default connect(mapStateToProps, { fetchStream, editStream })(
  StreamEdit
);
