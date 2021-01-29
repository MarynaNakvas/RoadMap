import React from 'react';
import { NavLink } from 'react-router-dom';

import './routing.scss';

const Routing: React.FunctionComponent = () => (
  <div className="routing">
    <nav>
      <NavLink
        exact
        to="/"
        activeClassName="active"
        className="routing-link"
      >
        Main
      </NavLink>
      <NavLink
        to="/table"
        activeClassName="active"
        className="routing-link"
      >
        Table
      </NavLink>
      <NavLink
        to="/errors"
        activeClassName="active"
        className="routing-link"
      >
        Show Errors
      </NavLink>
    </nav>
  </div>
);

Routing.displayName = 'Routing';

export default Routing;
