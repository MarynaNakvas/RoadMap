import React from 'react';
import { useSelector } from 'react-redux';
import List from 'components/list';
import { roadMapSelectors } from 'core/roadmap';

import './errors.scss';

const ErrorsPage = () => {
  const errors = useSelector(roadMapSelectors.getErrors);

  return (
    <List data={errors} />
  )
};

ErrorsPage.displayName = 'ErrorsPage';

export default ErrorsPage;
