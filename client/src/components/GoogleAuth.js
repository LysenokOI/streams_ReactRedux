import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
  /*(220) больше не нужно, т.к. state хранится в redux 
  state = { isSignedIn: null };*/

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
          /* (220) replace with redux state
          this.setState({ isSignedIn: this.auth.isSignedIn.get() }); //calls only once when the component first mounts
          */
          this.onAuthChange(this.auth.isSignedIn.get());
          console.log(this.auth.isSignedIn.get());
          // will return true or fale
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
    console.log("auth change check");
    if (isSignedIn) {
      //(222) add user ID who signing in
      this.props.signIn(this.auth.currentUser.get().getId());
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
    /* (220) replace with redux state
    if (this.state.isSignedIn === null) {*/
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
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

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
