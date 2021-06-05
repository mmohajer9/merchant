import {
  Box,
  Container,
  Grid,
  useTheme,
  makeStyles,
  Input,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Fab from '@material-ui/core/Fab';
import { Link } from 'react-router-dom';

import CartSVG from '../../assets/login/cart.svg';
import routes from '../../common/routes';
import React from 'react';

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
  cardContentRoot: {
    padding: theme.spacing(2),
  },
  cardActions: {
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  formControl: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  pos: {
    marginBottom: 12,
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
  const [isLogin, setIsLogin] = React.useState(true);

  return (
    <Box textAlign="center" bgcolor={theme.palette.common.lightGrey} height="100vh">
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
          {isLogin ? (
            <Grid item xs={12} sm container direction="column" justify="center" alignItems="center">
              <Grid item>
                <Typography variant="h4" color="secondary" gutterBottom>
                  Login
                </Typography>
              </Grid>
              <Card className={classes.cardRoot}>
                <CardContent className={classes.cardContentRoot}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <Input
                      fullWidth
                      autoFocus
                      id="username"
                      aria-describedby="username-helper-text"
                    />
                    <FormHelperText id="username-helper-text">Enter your username</FormHelperText>
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="password-helper">Password</InputLabel>
                    <Input fullWidth id="password-helper" aria-describedby="password-helper-text" />
                    <FormHelperText id="password-helper-text">Enter your Password</FormHelperText>
                  </FormControl>
                </CardContent>
                <CardActions className={classes.cardActions}>
                  <Button fullWidth variant="contained" color="secondary" size="large">
                    Login
                  </Button>
                </CardActions>
                <CardActions className={classes.cardActions}>
                  <FormHelperText id="forget-password-helper-text">
                    Forgot your password?
                    <Button color="secondary" to={routes.forgotPassword} component={Link}>
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
                    onClick={() => setIsLogin((prevState) => !prevState)}
                  >
                    Create New Account
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ) : (
            <Grid item xs={12} sm container direction="column" justify="center" alignItems="center">
              <Grid item>
                <Typography variant="h4" color="secondary" gutterBottom>
                  Sign Up
                </Typography>
              </Grid>
              <Card className={classes.cardRoot}>
                <CardContent className={classes.cardContentRoot}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <Input
                      fullWidth
                      autoFocus
                      id="username"
                      aria-describedby="username-helper-text"
                    />
                    <FormHelperText id="username-helper-text">Enter your username</FormHelperText>
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input fullWidth autoFocus id="email" aria-describedby="email-helper-text" />
                    <FormHelperText id="email-helper-text">Enter your username</FormHelperText>
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="password-helper">Password</InputLabel>
                    <Input fullWidth id="password-helper" aria-describedby="password-helper-text" />
                    <FormHelperText id="password-helper-text">Enter your password</FormHelperText>
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="confirm-password-helper">Confirm Your Password</InputLabel>
                    <Input
                      fullWidth
                      id="confirm-password-helper"
                      aria-describedby="confirm-password-helper-text"
                    />
                    <FormHelperText id="confirm-password-helper-text">
                      Enter your password again for confirmation
                    </FormHelperText>
                  </FormControl>
                </CardContent>
                <CardActions className={classes.cardActions}>
                  <Button fullWidth variant="contained" color="secondary" size="large">
                    Register
                  </Button>
                </CardActions>
                <CardActions className={classes.cardActions}>
                  <FormHelperText id="forget-password-helper-text">
                    Forgot your password?
                    <Button color="secondary" component={Link} to={routes.forgotPassword}>
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
                    onClick={() => setIsLogin((prevState) => !prevState)}
                  >
                    Already Have an Account ?
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
