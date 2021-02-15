import React from 'react';
import Table from 'modules/table';
import List from 'components/list';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Routing from 'components/routing';
import { useSelector } from 'react-redux';
import { roadMapSelectors } from 'core/roadmap';
import { PAGE_PATH } from 'core/app-constants';

const RoadMapApp = () => {
  const errors = useSelector(roadMapSelectors.getErrors);

  return (
    <BrowserRouter>
      <div>
        <Routing />
        <Switch>
          <Route exact path={PAGE_PATH.HOME}>
            <div className="message">Nakvas Marina roadmap</div>
          </Route>
          <Route path={PAGE_PATH.TABLE} component={Table} />
          <Route path={PAGE_PATH.ERRORS}>
            <List data={errors} />
          </Route>
          <Route>
            <div className="message">Nothing found</div>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default RoadMapApp;
