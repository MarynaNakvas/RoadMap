import React from 'react';
import { components } from 'react-select';

import { ReactComponent as ClearIcon } from 'assets/icons/close.svg';

const ClearIndicator = (props: any) => (
  <components.ClearIndicator {...props}>
    <ClearIcon width={24} height={24} />
  </components.ClearIndicator>
);

ClearIndicator.displayName = 'ClearIndicator';

export default ClearIndicator;
