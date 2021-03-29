import React, { FunctionComponent, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@material-ui/core/TextField';
import { getUser } from '../../state/actions/getUser';
import { selectUserDoc } from '../../state/selectors/user';
import Match from '../Match';

const App: FunctionComponent = () => {
  const user = useSelector(selectUserDoc);
  const dispatch = useDispatch();
  const location = useLocation();
  let history = useHistory();

  const { handleSubmit, handleChange, handleBlur, errors, touched } = useFormik({
    initialValues: {
      username: '',
    },
    onSubmit: (values) => {
      const username = values.username.replace(/\s+/g, '').toLowerCase();
      dispatch(getUser({ username }));
      history.push(`/${username}`, { updated: true });
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(2)
        .required('Please enter a username'),
    }),
  });

  useEffect(() => {
    if (location.pathname[1] && !location.state) {
      dispatch(getUser({ username: location.pathname.slice(1) }));
    }
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit} data-testid='app'>
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
      {user?.name}
      <Match />
    </>
  );
};

export default App;
