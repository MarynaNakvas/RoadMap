import React from 'react';

import './header.scss';

interface HeaderProps {
  title: string;
}

const Header: React.FunctionComponent<HeaderProps> = ({ title }) => (
  <header className="header">
    <div className="header-title">
      Roadmap app
    </div>
    <div className="header__page-title">
      {title}
    </div>
  </header>
);

Header.displayName = 'Header';

export default Header;
