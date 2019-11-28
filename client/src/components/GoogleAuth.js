import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
  state = { isSignedIn: null };

  componentDidMount() {
    /*(210)add callback when loading from google is complete (arrow function),
    this function starts only after loading complete*/
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "1032516168359-8undbllctepe80g2eub4n82tirp8njmj.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.setState({ isSignedIn: this.auth.isSignedIn.get() }); //calls only once when the component first mounts
          this.auth.isSignedIn.listen(this.onAuthChange); //(213) listen отслеживает сосотяние isSigned уже после инициализации
        });
    });
  }

  /*(218)от api получаем значение true or false, поэтому можем задать isSignedIn,
  как аргумент
  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
    
  };*/
  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      this.props.signIn();
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return null;
    } else if (this.state.isSignedIn) {
      return (
        <button className="ui blue google button" onClick={this.onSignOutClick}>
          <i className="vk icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button className="ui green google button" onClick={this.onSignInClick}>
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  }
  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}
/*(220) */
const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(null, { signIn, signOut })(GoogleAuth);
