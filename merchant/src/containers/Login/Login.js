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
} from "@material-ui/core";
import { Link } from "react-router-dom";

import CartSVG from "../../assets/login/cart.svg";
import routes from "../../common/routes";

const useStyles = makeStyles((theme) => ({
  cartPic: {
    minWidth: 275,
    width: "90%",
  },
  container: {
    height: "100%",
  },
  gridContainer: {
    height: "100%",
  },
  cardRoot: {
    minWidth: 275,
    width: "80%",
    padding: theme.spacing(4, 1, 4, 1),
    marginBottom: theme.spacing(4),
  },
  cardContentRoot: {
    padding: theme.spacing(2),
  },
  cardActions: {
    justifyContent: "center",
    flexWrap: "wrap",
  },
  formControl: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  pos: {
    marginBottom: 12,
  },
}));

const Login = (props) => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <Box
      textAlign="center"
      bgcolor={theme.palette.common.lightGrey}
      height="100vh"
    >
      <Container className={classes.container} disableGutters maxWidth="lg">
        <Grid className={classes.gridContainer} container alignItems="center">
          <Grid item xs={12} sm>
            <img className={classes.cartPic} alt="CartSVG" src={CartSVG} />
          </Grid>
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
              <CardContent className={classes.cardContentRoot}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="username">Username</InputLabel>
                  <Input
                    fullWidth
                    autoFocus
                    id="username"
                    aria-describedby="username-helper-text"
                  />
                  <FormHelperText id="username-helper-text">
                    Enter your username
                  </FormHelperText>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="password-helper">Password</InputLabel>
                  <Input
                    fullWidth
                    id="password-helper"
                    aria-describedby="password-helper-text"
                  />
                  <FormHelperText id="password-helper-text">
                    Enter your Password
                  </FormHelperText>
                </FormControl>
              </CardContent>
              <CardActions className={classes.cardActions}>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  size="large"
                >
                  Login
                </Button>
              </CardActions>
              <CardActions className={classes.cardActions}>
                <FormHelperText id="forget-password-helper-text">
                  Forgot your password?
                  <Link color="secondary" to={routes.forgotPassword} component={Button}>Click Here</Link>
                </FormHelperText>
              </CardActions>
              <CardActions className={classes.cardActions}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  size="large"
                >
                  Create New Account
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Login;
