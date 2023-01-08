import React from 'react';
import { Formik, Form } from 'formik';

const FormComponent = ({ formik, children, ...otherProps }: any) => (
  <Formik {...formik} onSubmit={formik.handleSubmit}>
    <Form {...otherProps}>{children}</Form>
  </Formik>
);

export default FormComponent;
