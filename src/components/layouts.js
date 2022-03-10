import React from "react";
import { BrowserRouter as Router, Route, Link, Outlet } from "react-router-dom";

function layouts() {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <nav>
        <ul>
          <li>
            <Link to="/" exact>
              Home
            </Link>
          </li>
          <li>
            <Link to="/test">Test</Link>
          </li>
          <li>
            <Link to="/survey_creator_v2">survey_creator_v2</Link>
          </li>
          <li>
            <Link to="/survey_create">Make your Own Survey</Link>
          </li>
          <li>
            <Link to="/survey">Survey</Link>
          </li>
        </ul>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}

export default layouts;
