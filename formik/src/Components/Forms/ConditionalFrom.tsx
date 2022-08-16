import React from "react";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import "./SimpleForm.css";

interface ConditionalValues {
  address: string;
  additionalAddress: string;
  haveAnotherAddress: boolean;
}

const validationSchema = yup.object().shape({
  address: yup.string().min(5, "Enter your full address").required("Required!"),
  haveAnotherAddress: yup.bool(),
  additionalAddress: yup.string().when("haveAnotherAddress", {
    is: true,
    then: yup.string().min(5, "Enter your full address").required("Required"),
  }),
});

const ConditionalFrom = () => {
  return (
    <Formik
      validateOnBlur
      initialValues={{
        address: "",
        additionalAddress: "",
        haveAnotherAddress: false,
      }}
      onSubmit={(values: ConditionalValues) => {
        return console.log(values);
      }}
      validationSchema={validationSchema}
    >
      {({
        values,
        errors,
        touched,
        dirty,
        isValid,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <Form onSubmit={handleSubmit}>
          <h2>Form with conditions</h2>
          <Field
            name="address"
            type="text"
            value={values.address}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form_field`}
            placeholder="Your Address"
          />
          {errors.address && touched.address && (
            <p className="error">{errors.address}</p>
          )}
          <label htmlFor="haveAnotherAddress" className={`form_label`}>
            <Field
              type="checkbox"
              id="haveAnotherAddress"
              name="haveAnotherAddress"
              checked={values.haveAnotherAddress}
            />
            Add Another address
          </label>
          {errors.haveAnotherAddress && (
            <p className="error">{errors.haveAnotherAddress}</p>
          )}
          {values.haveAnotherAddress && (
            <>
              <Field
                name="additionalAddress"
                type="text"
                value={values.additionalAddress}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form_field`}
                placeholder="Another Address"
              />
              {errors.additionalAddress && touched.additionalAddress && (
                <p className="error">{errors.additionalAddress}</p>
              )}
            </>
          )}

          <button type="submit" disabled={!isValid || !dirty}>
            Send
          </button>
        </Form>
      )}
    </Formik>
  );
};
export default ConditionalFrom;
