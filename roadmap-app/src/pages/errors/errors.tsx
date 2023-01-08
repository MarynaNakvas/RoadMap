import React, { useEffect, memo } from 'react';

import Errors from 'modules/errors';

interface ErrorsPageProps {
  title: string;
  setTitle(title: string): void;
}

const ErrorsPage: React.FunctionComponent<ErrorsPageProps> = memo(
  ({ title, setTitle }) => {
    useEffect(() => {
      setTitle(title);
    }, [title, setTitle]);

    return (
      <div className="table-container">
        <Errors />
      </div>
    );
});

ErrorsPage.displayName = 'ErrorsPage';

export default ErrorsPage;
