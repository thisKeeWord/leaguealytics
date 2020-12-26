import React, { FunctionComponent } from 'react';
import TextField from '@material-ui/core/TextField';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../state/actions/getUser';
import { selectUserDoc } from '../../state/selectors/user';

const Homepage: FunctionComponent = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserDoc);

  console.log(user, 'user');

  const formik = useFormik({
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
    <form onSubmit={formik.handleSubmit}>
      <TextField
        id='username'
        name='username'
        onChange={formik.handleChange}
        helperText={formik.touched.username && formik.errors.username}
        error={formik.touched.username && !!formik.errors.username}
        label='Summoner Name'
        onBlur={formik.handleBlur}
      />
    </form>
  );
};

export default Homepage;

// 1. dispatch action to my server
// 2. server calls firestore to get user
// 3. if user doesn’t exist, make call to riot’s api
//    a. update firestore
// 4. return user to frontend
// 5. update state
