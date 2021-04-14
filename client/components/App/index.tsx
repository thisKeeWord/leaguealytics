import React, { FunctionComponent, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { getUser } from '../../state/actions/getUser';
import { selectUserDoc } from '../../state/selectors/user';
import Match from '../Match';

const StyledApp = styled.div`
  width: 100%;
  min-height: 100%;
  background-image: url("../../../images/dashboard.jpeg"), linear-gradient(black, #080808);
  background-repeat: no-repeat;
  background-size: contain;
  // background-position: 
  display: inline-block;

  .search {
    box-shadow: 1px 1px 1px 1px darkcyan;
    box-sizing: border-box;
    border-radius: 5px;
    margin: 20px 0 20px 20px;
    width: fit-content;
    background: white;
    display: flex;
    align-items: center;

    & > input {
      padding: 16px;
      border: none;
      box-sizing: border-box;
      flex: 1;

      &:focus {
        outline: none;
      }
    }

    & > button {
      height: 51px;
      width: 51px;
      padding: 0;
      border: none;
      background: white;

      &:focus {
        outline: none;
      }
    }

    p {
      margin-top: 0;
      position: absolute;
      bottom: -20;
    }

    label {
      background-color: white;
    }

    fieldset {
      border: none;
    }
  }
`;

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
      {user?.name}
      <Match />
    </StyledApp>
  );
};

export default App;
