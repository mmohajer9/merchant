import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Fab from '@material-ui/core/Fab';
import { Link, useHistory } from 'react-router-dom';

import CartSVG from '../../assets/login/cart.svg';
import routes from '../../common/routes';
import Login from '../../components/Login/Login';
import React, { useEffect } from 'react';
import Register from '../../components/Register/Register';
import ForgotPassword from '../../components/ForgotPassword/ForgotPassword';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  cartPic: {
    minWidth: 275,
    width: '90%',
  },
  container: {
    height: '100%',
  },
  gridContainer: {
    height: '100%',
  },
  cardRoot: {
    minWidth: 275,
    width: '80%',
    padding: theme.spacing(4, 1, 4, 1),
    marginBottom: theme.spacing(4),
  },
  cardActions: {
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  extendedIcon: {
    marginRight: 17,
  },
  backButton: {
    position: 'fixed',
    left: '2%',
    top: '3%',
    [theme.breakpoints.down('xs')]: {
      margin: 'auto',
      width: '55%',
      left: 0,
      right: 0,
    },
  },
}));

const Authentication = (props) => {
  const theme = useTheme();
  const classes = useStyles();
  const [mode, setMode] = React.useState('login');
  const auth = useSelector((state) => state.auth);
  const history = useHistory();

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push(routes.profile);
    }
  }, [auth.isAuthenticated, history]);

  const switchTo = (nextMode) => () => {
    setMode(nextMode);
  };

  return (
    <Box
      textAlign="center"
      bgcolor={theme.palette.common.lightGrey}
      height="100vh"
    >
      <Fab
        className={classes.backButton}
        component={Link}
        to={routes.homepage}
        variant="extended"
        color="secondary"
        aria-label="back"
      >
        <ArrowBackIcon className={classes.extendedIcon} />
        Go Back Home
      </Fab>
      <Container className={classes.container} disableGutters maxWidth="lg">
        <Grid className={classes.gridContainer} container alignItems="center">
          <Grid item xs={12} sm>
            <img className={classes.cartPic} alt="CartSVG" src={CartSVG} />
          </Grid>
          {mode === 'login' ? (
            <Grid
              item
              xs={12}
              sm
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="h4" color="secondary" gutterBottom>
                  Login
                </Typography>
              </Grid>
              <Card className={classes.cardRoot}>
                <Login />
                <CardActions className={classes.cardActions}>
                  <FormHelperText id="forget-password-helper-text">
                    Forgot Your Password?
                    <Button
                      color="secondary"
                      onClick={switchTo('forgotPassword')}
                    >
                      Click Here
                    </Button>
                  </FormHelperText>
                </CardActions>
                <CardActions className={classes.cardActions}>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    size="large"
                    onClick={switchTo('signUp')}
                  >
                    Create New Account
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ) : mode === 'signUp' ? (
            <Grid
              item
              xs={12}
              sm
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="h4" color="secondary" gutterBottom>
                  Sign Up
                </Typography>
              </Grid>
              <Card className={classes.cardRoot}>
                <Register />
                <CardActions className={classes.cardActions}>
                  <FormHelperText id="forget-password-helper-text">
                    Forgot Your Password?
                    <Button
                      color="secondary"
                      onClick={switchTo('forgotPassword')}
                    >
                      Click Here
                    </Button>
                  </FormHelperText>
                </CardActions>
                <CardActions className={classes.cardActions}>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    size="large"
                    onClick={switchTo('login')}
                  >
                    Already Have an Account ?
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ) : (
            <Grid
              item
              xs={12}
              sm
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="h4" color="secondary" gutterBottom>
                  Forgot Your Password ?
                </Typography>
              </Grid>
              <Card className={classes.cardRoot}>
                <ForgotPassword />
                <CardActions className={classes.cardActions}>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    size="large"
                    onClick={switchTo('login')}
                  >
                    Already Have an Account ?
                  </Button>
                </CardActions>
                <CardActions className={classes.cardActions}>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    size="large"
                    onClick={switchTo('signUp')}
                  >
                    Create New Account
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default Authentication;
