import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { roadMapSelectors } from 'core/roadmap';
import List from 'components/list';

import './errors.scss';

interface ErrorsPageProps {
  title: string;
  setTitle(title: string): void;
}

const ErrorsPage = ({ title, setTitle }: ErrorsPageProps) => {
  const errors = useSelector(roadMapSelectors.getErrors);

  useEffect(() => {
    setTitle(title);
  }, [title, setTitle]);

  return (
    <List data={errors} />
  )
};

ErrorsPage.displayName = 'ErrorsPage';

export default ErrorsPage;
