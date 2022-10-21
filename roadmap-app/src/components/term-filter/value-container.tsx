import React, { memo } from 'react';

import { components, ValueContainerProps } from 'react-select';
import { Box } from '@material-ui/core';

const ValueContainer: React.FunctionComponent<
  ValueContainerProps<any, false>
> = memo((props) => {
  const { hasValue, children, ...restProps } = props;
  if (!hasValue) {
    return <components.ValueContainer {...props} />;
  }

  if (Array.isArray(children)) {
    const updatedChildren = children.slice();
    // hack to solve issue with custom value container
    // https://github.com/JedWatson/react-select/issues/2597
    const firstChild = updatedChildren[0];
    if (Array.isArray(firstChild)) {
      const { length } = firstChild;

      if (length > 1) {
        updatedChildren[0] = (
          <Box
            component="span"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {`${length} selected`}
          </Box>
        );
      }

      return (
        <components.ValueContainer hasValue={hasValue} {...restProps}>
          {updatedChildren}
        </components.ValueContainer>
      );
    }
  }
  return <components.ValueContainer {...props} />;
});

ValueContainer.displayName = 'ValueContainer';

export default ValueContainer;
