import React from 'react';
import Table from 'modules/table';
import List from 'components/list';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Routing from 'components/routing';
import { useSelector } from 'react-redux';
import { roadMapSelectors } from 'core/roadmap';

const RoadMapApp = () => {
  const errors = useSelector(roadMapSelectors.getErrors);

  return (
    <BrowserRouter>
      <div>
        <Routing />
        <Switch>
          <Route exact path="/">
            <div className="message">Nakvas Marina roadmap</div>
          </Route>
          <Route path="/table" component={Table} />
          <Route path="/errors">
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
