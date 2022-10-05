import React, { ReactNode } from 'react';

import SideNavigationMenu from 'modules/side-navigation-menu';
import Header from 'modules/header';

interface AppContainerProps {
  title: string;
  children: ReactNode;
}

const AppContainer = ({ title, children }: AppContainerProps) => (
  <>
    <SideNavigationMenu />

    <Header title={title} />

    <div className="content">
      {React.Children.map(
        children,
        (item) => item,
      )}
    </div>
  </>
);

export default AppContainer;
