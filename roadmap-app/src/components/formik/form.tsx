import React from 'react';

const Form = ({ formik, children, ...otherProps }: any) => (
  <form onSubmit={formik?.handleSubmit} {...otherProps}>
    {children}
  </form>
);

export default Form;
