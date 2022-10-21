import React, { useEffect } from 'react';

import './home.scss';

interface HomePageProps {
  title: string;
  setTitle(title: string): void;
}

const HomePage = ({ title, setTitle }: HomePageProps) => {
  useEffect(() => {
    setTitle(title);
  }, [title, setTitle]);

  return <div className="home-container">Nakvas Marina roadmap</div>;
};

HomePage.displayName = 'HomePage';

export default HomePage;
