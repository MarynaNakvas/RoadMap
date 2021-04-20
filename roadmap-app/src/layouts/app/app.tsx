import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import {
  TransitionGroup,
  CSSTransition,
} from 'react-transition-group';
import Table from 'modules/table';
import List from 'components/list';
import Routing from 'layouts/routing';
import { roadMapSelectors } from 'core/roadmap';
import { PAGE_PATH } from 'core/app-constants';
import ReactTable from 'modules/react-table';

const RoadMapApp = withRouter(({ location }) => {
  const errors = useSelector(roadMapSelectors.getErrors);
  const firstChild = (props: any) => {
    const childrenArray = React.Children.toArray(props.children);
    return childrenArray[0] || null;
  };
  return (
    <div>
      <Routing />
      <TransitionGroup component={firstChild}>
        <CSSTransition
          key={location.key}
          classNames="slide"
          timeout={700}
        >
          <Switch>
            <Route exact path={PAGE_PATH.HOME}>
              <div className="message">Nakvas Marina roadmap</div>
              {/* <ReactTable /> */}
            </Route>
            <Route exact path={PAGE_PATH.TABLE} component={Table} />
            <Route exact path={PAGE_PATH.ERRORS}>
              <List data={errors} />
            </Route>
            <Route>
              <div className="message">Nothing found</div>
            </Route>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
});

export default RoadMapApp;
