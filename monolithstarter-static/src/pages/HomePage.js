import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class HomePage extends Component {
  render() {
    return (
      <div>
        <div className="home-page">
          <Link to="/hello">Click to see hello message</Link>
        </div>
        <div className="non-duplicate-list-page">
          <Link to="/non-duplicate-list">Click to see non-duplicate list</Link>
        </div>
        <div className="duplicate-list-page">
          <Link to="/duplicate-list">Click to see duplicate list</Link>
        </div>
      </div>
    );
  }
}

export default withRouter(HomePage);
