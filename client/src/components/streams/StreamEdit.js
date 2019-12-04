import React from "react";
import { connect } from "react-redux";
import { fetchStream } from "../../actions"; //(264)

/*(264) StreamList replace with class component  
let StreamEdit = props => {
  console.log(props);*/
class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

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
    return <div>{this.props.stream.title}</div>;
  }
}

/*(260) ownProps of state are the same, as props from Route */
let mapStateToProps = (state, ownProps) => {
  //console.log(ownProps);
  /*(262) streams are stored inredux as object */
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamEdit);
