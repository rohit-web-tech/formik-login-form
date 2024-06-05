import React, { useEffect, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik';
import * as Yup from 'yup';
import "./App.css"

const FocusError = ({inputRefs}) => {
    const { errors, isSubmitting, isValidating } = useFormikContext();
  
    useEffect(() => {
      if (isSubmitting && !isValidating) {
        const errorKeys = Object.keys(errors);
        if (errorKeys.length > 0) {
          const firstErrorField = errorKeys[0];
          if (inputRefs.current[firstErrorField]) {
            inputRefs.current[firstErrorField].focus();
          }
        }
      }
    }, [errors, isSubmitting, isValidating]);
  
    return null;
  };

const App = () => {
    const inputRefs = useRef({});
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3,"Name should have at least 3 characters!!")
      .max(15, 'Must be 15 characters or less')
      .required('Name is required!!'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required!!'),
    password: Yup.string()
      .min(6, 'Must be at least 6 characters')
      .required('Password is required!!'),
  });

  return (
    <div id="form">
      <h1>Login Form</h1>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting , resetForm}) => {
          alert("User signed up successfully with following details : \n" + JSON.stringify(values,null,1));
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ isSubmitting ,errors , touched }) => (
          <Form>
            <FocusError inputRefs={inputRefs}/>
            <div className="input-feild">
              <label htmlFor="name">Name *</label>
              <Field innerRef={(el)=>inputRefs.current.name=el} type="text" name="name" className={errors.name && touched.name ? 'error' : ''}/>
              <ErrorMessage name="name" component="div" />
            </div>
            <div className="input-feild">
              <label htmlFor="email">Email *</label>
              <Field innerRef={(el)=>inputRefs.current.email=el} type="email" name="email" className={errors.email && touched.email ? 'error' : ''}/>
              <ErrorMessage name="email" component="div" />
            </div>
            <div className="input-feild">
              <label htmlFor="password">Password *</label>
              <Field innerRef={(el)=>inputRefs.current.password=el} type="password" name="password" className={errors.password && touched.password ? 'error' : ''}/>
              <ErrorMessage name="password" component="div" />
            </div>
            <div className="input-feild">
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default App;
