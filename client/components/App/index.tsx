import React, { FunctionComponent, useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import cx from 'classnames'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import SearchIcon from '@material-ui/icons/Search'
import { toast } from 'react-toastify'
import { getUser } from '../../state/actions/getUser'
import { selectUserDoc, selectUserError, selectUserFetching } from '../../state/selectors/user'
import Match from '../Match'
import Intro from '../Intro'
import LoadingIndicator from '../LoadingIndicator'
import { StyledApp } from './styles'

const App: FunctionComponent = () => {
  const [isNewUser, setIsNewUser] = useState<boolean>(false)
  const user = useSelector(selectUserDoc)
  const userError = useSelector(selectUserError)
  const userLoading = useSelector(selectUserFetching)
  const dispatch = useDispatch()
  const location = useLocation()
  const { state, search } = location
  const history = useHistory()

  const {
    handleSubmit, handleChange, errors, touched, values, resetForm,
  } = useFormik(
    {
      initialValues: {
        username: '',
      },
      onSubmit: async (val) => {
        const username = val.username.replace(/\s+/g, '').toLowerCase()
        const currentUsername = user?.name.replace(/\s+/g, '').toLowerCase()
        setIsNewUser(currentUsername ? username !== currentUsername : false)
        history.push(`/?q=${username}`, { updated: true }) // maybe remove the updated?
        await dispatch(getUser({ username }))
        resetForm()
      },
      validationSchema: Yup.object({
        username: Yup.string()
          .min(2, 'Must be at least 2 characters')
          .required('Please enter a username'),
      }),
    },
  )

  const refreshUser = (): void => {
    if (user?.name) {
      setIsNewUser(false)
      dispatch(getUser({ username: user.name.replace(/\s+/g, '').toLowerCase() }))
    }
  }

  useEffect(() => {
    if (search && !state && !user) {
      dispatch(getUser({ username: search.slice(3) }))
    }
  }, [search])

  if (userError) {
    toast.error(userError, { toastId: 'rootError' })
  }

  return (
    <StyledApp>
      <div className={cx('container', { 'left-display': !search })}>
        <div className="links">
          <Link className="about-link" to="/about" data-testid="about-link">About</Link>
          <Link className="issue-link" to="/submit-issue" data-testid="issue-submit">Submit An Issue</Link>
        </div>
        {!search && (
          <Intro />
        )}
        <div className="root-form">
          {search && (
            <div className="username-refresh">
              <div className="username-level">
                <span className="username" data-testid="username">{user?.name}</span>
                {user?.summonerLevel && (
                  <span className="level">
                    level
                    {' '}
                    {user.summonerLevel}
                  </span>
                )}
              </div>
              {user?.id && (
                <Button className="refresh-button" onClick={refreshUser}>
                  <i className={cx('fa fa-refresh', { 'fa-spin': userLoading && !isNewUser })} data-testid="refresh" />
                </Button>
              )}
            </div>
          )}
          <form onSubmit={handleSubmit} className="search" data-testid="form">
            <TextField
              id="username"
              name="username"
              onChange={handleChange}
              helperText={touched.username && errors.username}
              error={touched.username && !!errors.username}
              label="Summoner Name"
              variant="outlined"
              value={values.username}
            />
            <IconButton type="submit" aria-label="search">
              <SearchIcon />
            </IconButton>
          </form>
        </div>
        {userLoading && (!user?.id || isNewUser) ? (
          <LoadingIndicator />
        ) : (
          <div className="games">
            {user?.name && <span><i>Only Howling Abyss and Summoner&apos;s Rift games</i></span>}
            <Match />
          </div>
        )}
      </div>
    </StyledApp>
  )
}

export default App
