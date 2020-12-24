import React, { FunctionComponent } from "react";
import TextField from "@material-ui/core/TextField";
import { useFormik } from "formik";
import * as Yup from "yup";

const Homepage: FunctionComponent = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
    },
    onSubmit: (values) => console.log(values),
    validationSchema: Yup.object({
      username: Yup.string()
        .min(2)
        .required("Please enter a username"),
    }),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        id="username"
        name="username"
        onChange={formik.handleChange}
        helperText={formik.touched.username && formik.errors.username}
        error={formik.touched.username && !!formik.errors.username}
        label="Summoner Name"
        onBlur={formik.handleBlur}
      />
    </form>
  );
};

export default Homepage;
