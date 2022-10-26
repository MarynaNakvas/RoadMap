import React, { memo, useCallback } from 'react';

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

const StickyFormControls: React.FunctionComponent<StickyFormControlsProps> = memo(
  ({
    className,
    isTouched,
    inProgress,
    resetForm,
    onclick,
    title = 'Save changes',
    cancelTitle = 'Cancel',
  }) => {
    const onCancel = useCallback(() => resetForm(), [
      resetForm,
      isTouched,
    ]);

    return (
      <ActionsBar className={className} isSticky={isTouched}>
        <ActionsWithToaster className="sticky-form-controls">
          <div className="sticky-form-controls__inner-container">
            <div className="sticky-form-controls__buttons">
              <Spinner isFetching={inProgress} circleSize={20} >
                <button
                  type={onclick ? 'button' : 'submit'}
                  disabled={!isTouched}
                >
                  {title}
                </button>
                {isTouched && (
                  <button type="button" onClick={onCancel}>
                    {cancelTitle}
                  </button>
                )}
              </Spinner>
            </div>
          </div>
        </ActionsWithToaster>
      </ActionsBar>
    );
  },
);

StickyFormControls.displayName = 'StickyFormControls';

export default StickyFormControls;
