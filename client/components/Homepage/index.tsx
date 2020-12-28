import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@material-ui/core/TextField';
import { getUser } from '../../state/actions/getUser';

const Homepage: FunctionComponent = () => {
  const dispatch = useDispatch();

  const { handleSubmit, handleChange, handleBlur, errors, touched } = useFormik({
    initialValues: {
      username: '',
    },
    onSubmit: (values) => {
      const username = values.username.replace(/\s+/g, '').toLowerCase();
      dispatch(getUser({ username }));
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(2)
        .required('Please enter a username'),
    }),
  });

  return (
    <form onSubmit={handleSubmit} data-testid='homepage'>
      <TextField
        id='username'
        name='username'
        onChange={handleChange}
        helperText={touched.username && errors.username}
        error={touched.username && !!errors.username}
        label='Summoner Name'
        onBlur={handleBlur}
      />
    </form>
  );
};

export default Homepage;
