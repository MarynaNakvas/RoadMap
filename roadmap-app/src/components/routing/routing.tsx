import React from 'react';
import { NavLink } from 'react-router-dom';
import { PAGE_PATH } from 'core/app-constants';

import './routing.scss';

const Routing: React.FunctionComponent = () => (
  <div className="routing">
    <nav>
      <NavLink
        exact
        to={PAGE_PATH.HOME}
        activeClassName="active"
        className="routing-link"
      >
        Main
      </NavLink>
      <NavLink
        to={PAGE_PATH.TABLE}
        activeClassName="active"
        className="routing-link"
      >
        Table
      </NavLink>
      <NavLink
        to={PAGE_PATH.ERRORS}
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
