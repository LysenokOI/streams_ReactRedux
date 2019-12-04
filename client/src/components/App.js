import React from "react";
import { Router, BrowserRouter, Route } from "react-router-dom"; // (256) add plain router
import StreamCreate from "./streams/StreamCreate";
import StreamDelete from "./streams/StreamDelete";
import StreamEdit from "./streams/StreamEdit";
import StreamList from "./streams/StreamList";
import StreamShow from "./streams/StreamShow";
import Header from "./Header";
import history from "../history"; //(256)

let App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        {" "}
        {/* (256) replace BrowserRouter* with Router 
      to dont create own history of BrowserRouter */}
        <div>
          <Header />
          <Route path="/" exact component={StreamList} />
          <Route path="/streams/new" component={StreamCreate} />
          <Route path="/streams/edit/:id" component={StreamEdit} />{" "}
          {/* (260) add :id, url based selection.
           this is param value inside props.match*/}
          <Route path="/streams/delete" component={StreamDelete} />
          <Route path="/streams/show" component={StreamShow} />
        </div>
      </Router>
    </div>
  );
};

export default App;
