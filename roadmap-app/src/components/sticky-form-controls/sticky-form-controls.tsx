import React, { useCallback } from 'react';
import { Button } from '@material-ui/core';

import ActionsBar from 'components/actions-bar';
import ActionsWithToaster from 'components/actions-with-toaster';
import Spinner from 'components/spinner';

import './sticky-form-controls.scss';

interface StickyFormControlsProps {
  className?: string;
  isTouched?: boolean;
  inProgress?: boolean;
  resetForm(): void;
  onclick?(): void;
  title?: string;
  cancelTitle?: string;
}

const StickyFormControls: React.FunctionComponent<
  StickyFormControlsProps
> = ({
  className,
  isTouched,
  inProgress,
  resetForm,
  onclick,
  title = 'Save changes',
  cancelTitle = 'Cancel',
}) => {
  const onCancel = useCallback(() => resetForm(), [resetForm, isTouched]);

  return (
    <ActionsBar
      className={className}
      isSticky={isTouched}
    >
      <ActionsWithToaster className="sticky-form-controls">
        <div className="sticky-form-controls__inner-container">
          <div className="sticky-form-controls__buttons">
            <Spinner isFetching={inProgress}>
              <Button
                type={onclick ? 'button' : 'submit'}
                variant="contained"
                color="primary"
                onClick={onclick}
                disabled={!isTouched}
              >
                {title}
              </Button>
              {isTouched && (
                <Button
                  type="button"
                  variant="outlined"
                  color="primary"
                  onClick={onCancel}
                >
                  {cancelTitle}
                </Button>
              )}
            </Spinner>
          </div>
        </div>
      </ActionsWithToaster>
    </ActionsBar>
  );
};

StickyFormControls.displayName = 'StickyFormControls';

export default StickyFormControls;
