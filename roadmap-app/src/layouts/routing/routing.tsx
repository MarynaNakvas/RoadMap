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
        className="routing-link"
        activeClassName="routing-link--active"
      >
        Main
      </NavLink>
      <NavLink
        to={PAGE_PATH.TABLE}
        className="routing-link"
        activeClassName="routing-link--active"
      >
        Table
      </NavLink>
      <NavLink
        to={PAGE_PATH.ERRORS}
        className="routing-link"
        activeClassName="routing-link--active"
      >
        Show Errors
      </NavLink>
    </nav>
  </div>
);

Routing.displayName = 'Routing';

export default Routing;
