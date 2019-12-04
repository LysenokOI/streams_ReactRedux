import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStreams } from "../../actions";

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
    //console.log(this.props.fetchStreams());
  }
  //(251) add admin buttons
  renderAdmin(stream) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          {/* (260) URL based selection. replace button tags with Link 
          <button className="ui button primary">Edit</button>
          */}
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
            Edit
          </Link>
          <button className="ui button negative">Delete</button>
        </div>
      );
    }
  }

  renderList() {
    return this.props.streams.map(stream => {
      return (
        <div className="item" key={stream.id}>
          <div>{this.renderAdmin(stream)}</div> {/*(251)*/}
          <i className="large middle aligned icon camera" />
          <div className="content">
            {stream.title}
            <div className="description">{stream.description} </div>
          </div>
        </div>
      );
    });
  }

  //(252)
  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: "right" }}>
          <Link to="/streams/new" className="ui button primary">
            Create Stream
          </Link>
        </div>
      );
    }
  }

  render() {
    //console.log(this.props.streams);
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">{this.renderList()}</div>
        <div>{this.renderCreate()}</div>
      </div>
    );
  }
}

/* (249) get array of streams from stored object */
let mapStateToProps = state => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId, // (251) add userId currently signed in
    isSignedIn: state.auth.isSignedIn //(252)
  };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
