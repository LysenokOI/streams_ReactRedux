import React from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";

let Header = () => {
  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="item">
        Twi4
      </Link>
      <div className="right menu">
        <Link to="/" className="item">
          All Streams
        </Link>
        <GoogleAuth />
      </div>
    </div>
  );
};

export default Header;
