import React from "react";
import Input from "../FormsElements/Input";
import { Field, Form, Formik, FormikHelpers, FormikValues } from "formik";
import * as yup from 'yup';
import './SimpleForm.css';

interface Values {
  name: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  email: string;
  confirmEmail: string;
}

const validationSchema = yup.object().shape({
    name : yup.string().min(2, 'Too short!').required('Required'),
    lastName: yup.string().min(2, 'Too short!').required('Required'),
    password: yup.string().min(2, 'Too short!').required('Required'),
    confirmPassword: yup.string().min(2, 'Too short!').required('Required').oneOf([ yup.ref('password')], 'Passwords do not match'),
    email: yup.string().min(2, 'Too short!').email('Not correct').required('Required'),
    confirmEmail: yup.string().min(2, 'Too short!').email('Not correct').required('Required').oneOf([ yup.ref('email')], 'Email do not match'),
});

const SimpleForm = () => {
  return (
    <Formik
      initialValues={{
        name: "",
        lastName: "",
        password: "",
        confirmPassword: "",
        email: "",
        confirmEmail: "",
      }}
      validateOnBlur
      onSubmit={(values: Values): void | Promise<any> => {
        return console.log(values);
      }}
      validationSchema = {validationSchema}
    >
      {({
        values,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        touched,
        isValid,
        dirty,
      }) => (
       
        <Form onSubmit={handleSubmit}>
           <h2>Simple Form</h2>
          <Field
            type="text"
            name="name"
            value={values.name}
            placeholder="Your First Name"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form_field`} 
          />
          { touched.name && errors.name && <p className="error">{errors.name}</p>}
          <Field
            type="text"
            name="lastName"
            value={values.lastName}
            placeholder="Your Last Name"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form_field`} 
          />
          { touched.lastName && errors.lastName && <p className="error">{errors.lastName}</p>}
          <Field
            type="password"
            name="password"
            value={values.password}
            placeholder="Your Password"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form_field`} 
          />
          { touched.password && errors.password &&<p className="error">{errors.password}</p>}
          <Field
            type="password"
            name="confirmPassword"
            value={values.confirmPassword}
            placeholder="Confirm Your Password"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form_field`} 
          />
          { touched.confirmPassword && errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
          <Field
            type="email"
            name="email"
            value={values.email}
            placeholder="Your E-mail"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form_field`} 
            autocomplite ='off'
          />
          { touched.email && errors.email && <p className="error">{errors.email}</p>}
          <Field
            type="email"
            name="confirmEmail"
            value={values.confirmEmail}
            placeholder="Confirm Your E-mail"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form_field`} 
          />
          { touched.confirmEmail && errors.confirmEmail && <p className="error">{errors.confirmEmail}</p>}
          <button type="submit" disabled={!isValid || !dirty} >Send</button>
        </Form>
      )}
    </Formik>
  );
};

export default SimpleForm;
