import React, { Component, MouseEvent } from 'react';
import { NavLink } from 'react-router-dom';

import { ReactComponent as Logo } from 'assets/icons/logo.svg';
import { ReactComponent as MenuIcon } from 'assets/icons/menu.svg';
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';
import { ReactComponent as DragIcon } from 'assets/icons/double-horizontal-arrow.svg';
import appRoutes from 'core/app-routes';

import './side-navigation-menu.scss';

interface SideNavigationMenuDrag {
  active: boolean;
  x: number;
}

interface SideNavigationMenuState {
  isSidebarExpanded: boolean;
  drag: SideNavigationMenuDrag;
  width: number;
}

export default class SideNavigationMenu extends Component<
  any,
  SideNavigationMenuState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      isSidebarExpanded: false,
      drag: {
        active: false,
        x: 0,
      },
      width: 0,
    };
  }

  componentDidMount() {
    const storagedWidth = localStorage.getItem('width');   
    const width = storagedWidth ? Number(storagedWidth) : 200;
    this.setState({ width: width });
  }

  toggleSidebar = () => {
    this.setState({
      isSidebarExpanded: !this.state.isSidebarExpanded,
    });
  };

  startResize = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    this.setState({
      drag: {
        active: true,
        x: e.clientX,
      },
    });
  };

  resizeFrame = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const { active, x } = this.state.drag;
    if (active) {
      const xDiff = Math.abs(x - e.clientX);
      const newWidth =
        x > e.clientX
          ? this.state.width - xDiff
          : this.state.width + xDiff;
      this.setState({
        drag: { ...this.state.drag, x: e.clientX },
        width: newWidth < 200 ? 200 : newWidth,
      });
    }
  };

  stopResize = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    this.setState({ drag: { ...this.state.drag, active: false } });
    localStorage.setItem('width', `${this.state.width}`);
  };

  render() {
    return (
      <>
        <div
          className={`sidebar-menu__wrapper ${
            this.state.isSidebarExpanded
              ? 'sidebar-menu__wrapper-expanded'
              : ''
          }`}
          onMouseMove={this.resizeFrame}
          onMouseUp={this.stopResize}
          style={
            this.state.isSidebarExpanded
              ? { width: `${this.state.width + 20}px` }
              : {}
          }
        >
          <div
            className={`sidebar-menu ${
              this.state.isSidebarExpanded
                ? 'sidebar-menu-expanded'
                : ''
            }`}
            style={
              this.state.isSidebarExpanded
                ? { width: `${this.state.width}px` }
                : {}
            }
          >
            <div className="sidebar-menu__navigation">
              <Logo />
              <div className="sidebar-menu__buttons">
                <button
                  type="button"
                  onClick={this.toggleSidebar}
                  className="sidebar-menu__button-burger"
                >
                  <MenuIcon />
                </button>

                <button
                  type="button"
                  onClick={this.toggleSidebar}
                  className="sidebar-menu__button-close"
                >
                  <CloseIcon />
                </button>

                <button
                  type="button"
                  className="sidebar-menu__button-drag"
                  onMouseDown={this.startResize}
                >
                  <DragIcon />
                </button>
              </div>
              <div className="sidebar-menu__container">
                {appRoutes.map((item, index) => (
                  <NavLink
                    key={index}
                    to={item.path}
                    className="routing-link"
                    activeClassName="routing-link--active"
                    onClick={() => this.setState({
                      isSidebarExpanded: false,
                    })}
                  >
                    {item.title}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
