import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';

import { isButtonDisabled } from "../../store/modules/login/actions";
import { ILogin, ILoginState } from '../../store/modules/login/types';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../store';
import api from '../../services/api';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 400,
      margin: `${theme.spacing(0)} auto`
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1
    },
    header: {
      textAlign: 'center',
      background: '#212121',
      color: '#fff'
    },
    card: {
      marginTop: theme.spacing(10)
    }
  })
);

const Register = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const loginState = useSelector<IState, ILoginState>(state => state.login);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (email.trim() && password.trim()) {
     dispatch(isButtonDisabled(false));
    } else {
      dispatch(isButtonDisabled(true));
    }
  }, [dispatch, email, password]);

  async function handleRegister(login: ILogin) {
    await api.post('/users', login).then(response => {
      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: response.data,
      })
      history.push('/clocks-list');
    })
    .catch(error => {
      dispatch({
        type: 'REGISTER_FAILED',
        payload: [],
      })
    })
  }

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <Card className={classes.card}>
        <CardHeader className={classes.header} title="Login App" />
        <CardContent>
          <div>
            <TextField
              fullWidth
              id="name"
              type="name"
              name="name"
              label="Name"
              placeholder="Name"
              margin="normal"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
            <TextField
              fullWidth
              id="email"
              type="email"
              name="email"
              label="Email"
              placeholder="Email"
              margin="normal"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
            <TextField
              fullWidth
              id="password"
              type="password"
              label="Password"
              placeholder="Password"
              margin="normal"
              helperText={loginState.warnings.helperText}
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
          </div>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            className={classes.loginBtn}
            onClick={() => handleRegister({ name, email, password })}
            disabled={loginState.warnings.isButtonDisabled}>
            Login
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}

export default Register;