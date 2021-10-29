import React, { Component, MouseEvent } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'clsx';

import { ReactComponent as MenuIcon } from 'assets/icons/menu.svg';
import appRoutes from 'core/app-routes';

import './side-navigation-menu.scss';

export default class SideNavigationMenu extends Component {
  state = {
    isSidebarExpanded: false,
    drag: {
      active: false,
      x: 0,
    },
    dims: {
      w: 200,
    },
    ref: React.createRef<HTMLButtonElement>(),
  };

  toggleSidebar = () => {
    this.setState({
      isSidebarExpanded: !this.state.isSidebarExpanded,
    });
  };

  startResize = (e: MouseEvent<HTMLButtonElement>) => {
    this.setState({
      drag: {
        active: true,
        x: e.clientX,
      },
    });
  };

  resizeFrame = (e: MouseEvent<HTMLDivElement>) => {
    const { active, x } = this.state.drag;
    if (active) {
      const xDiff = Math.abs(x - e.clientX);
      const newW =
        x > e.clientX
          ? this.state.dims.w - xDiff
          : this.state.dims.w + xDiff;
      this.setState({
        drag: { ...this.state.drag, x: e.clientX },
        dims: { w: newW },
      });
    }
  };

  stopResize = () => {
    this.setState({ drag: { ...this.state.drag, active: false } });
  };

  render() {
    return (
      <React.Fragment>
        <div
          className="sidebar-menu__wrapper"
          onMouseMove={this.resizeFrame}
          onMouseUp={this.stopResize}
        >
          <div
            className={classNames('sidebar-menu', {
              'sidebar-menu_expanded': this.state.isSidebarExpanded,
            })}
            style={
              this.state.isSidebarExpanded
                ? { width: `${this.state.dims.w}px` }
                : {}
            }
          >
            <div className="sidebar-menu__navigation">
              <div className="sidebar-menu__buttons">
                <button
                  type="button"
                  onClick={this.toggleSidebar}
                  className="sidebar-menu__burger"
                >
                  <MenuIcon />
                </button>
                <button
                  type="button"
                  className="sidebar-menu__drag"
                  ref={this.state.ref}
                  onMouseDown={this.startResize}
                >
                  <MenuIcon />
                </button>
              </div>
              <div className="sidebar-menu__menu-container">
                {appRoutes.map((item, index) => (
                  <NavLink
                    key={index}
                    to={item.path}
                    className="routing-link"
                    activeClassName="routing-link--active"
                  >
                    {item.title}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
