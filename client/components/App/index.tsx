import React, { FunctionComponent, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { getUser } from '../../state/actions/getUser';
import { selectUserDoc } from '../../state/selectors/user';
import Match from '../Match';
import { StyledApp } from './styles';

const App: FunctionComponent = () => {
  const user = useSelector(selectUserDoc);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const {
    handleSubmit, handleChange, handleBlur, errors, touched,
  } = useFormik(
    {
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
          .min(2, 'Must be at least 2 characters')
          .required('Please enter a username'),
      }),
    },
  );

  useEffect(() => {
    if (location.pathname[1] && !location.state) {
      dispatch(getUser({ username: location.pathname.slice(1) }));
    }
  }, []);

  return (
    <StyledApp>
      <div className="backdrop" />
      <div className="root-form">
        <span className="username">{user?.name}</span>
        <form onSubmit={handleSubmit} className="search" data-testid="app">
          <TextField
            id="username"
            name="username"
            onChange={handleChange}
            helperText={touched.username && errors.username}
            error={touched.username && !!errors.username}
            label="Summoner Name"
            onBlur={handleBlur}
            variant="outlined"
          />
          <IconButton type="submit" aria-label="search">
            <SearchIcon />
          </IconButton>
        </form>
      </div>
      <Match />
    </StyledApp>
  );
};

export default App;
