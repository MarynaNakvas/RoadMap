import React, { useState } from 'react';
import {
  Switch,
  Route,
  withRouter,
  Redirect,
} from 'react-router-dom';
import {
  TransitionGroup,
  CSSTransition,
} from 'react-transition-group';
import AppContainer from 'layouts/app-container';
import appRoutes from 'core/app-routes';
import { PAGE_PATH, PAGE_TITLES } from 'core/app-constants';

const RoadMapApp = withRouter(({ location }) => {
  const firstChild = (props: any) => {
    const childrenArray = React.Children.toArray(props.children);
    return childrenArray[0] || null;
  };

  const [title, setTitle] = useState(PAGE_TITLES.HOME);

  return (
    <div>
      <AppContainer title={title}>
        <TransitionGroup component={firstChild}>
          <CSSTransition
            key={location.key}
            classNames="slide"
            timeout={700}
          >
            <Switch>
              {appRoutes.map(
                (
                  { path, component: Component, title },
                  index: number,
                ) => (
                  <Route
                    exact={!index}
                    key={path}
                    path={path}
                    render={() => (
                      <Component title={title} setTitle={setTitle} />
                    )}
                  />
                ),
              )}
              <Redirect to={PAGE_PATH.HOME} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </AppContainer>
    </div>
  );
});

export default RoadMapApp;
