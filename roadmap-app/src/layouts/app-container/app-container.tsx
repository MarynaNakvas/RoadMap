import React, { useCallback, useState }  from 'react';
import classNames from 'clsx';

import SideNavigationMenu from 'modules/side-navigation-menu';

import './app-container.scss';

interface AppContainerProps {
  children: any;
}

const AppContainer = ({ children }: AppContainerProps) => {
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);
  const toggleSidebar = useCallback(() => {
    setSidebarExpanded(!isSidebarExpanded);
  }, [isSidebarExpanded]);
  return (
    <>
      <SideNavigationMenu
        toggleSidebar={toggleSidebar}
        isSidebarExpanded={isSidebarExpanded}
      />
      <div
        className={classNames('main-content layout-body', {
          'main-content_collapsed': false,
        })}
      >

        <div className="content">
					{React.Children.map(
						children,
						(item) => item,
					)}
        </div>
      </div>
    </>
  )};

export default AppContainer;
