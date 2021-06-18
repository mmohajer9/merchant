import React, { useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import makeStyles from '@material-ui/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import AccountCircleIconOutlined from '@material-ui/icons/AccountCircleOutlined';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import VerifiedUserOutlinedIcon from '@material-ui/icons/VerifiedUserOutlined';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import routes from '../../common/routes';
import getUserRemoteInfo from '../../store/auth/getUserRemoteInfo';
import { authActions } from '../../store/auth';

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
  listItem: {
    '&:hover': {
      color: theme.palette.common.hovered,
    },
    marginBottom: theme.spacing(1),
  },
  listItemIcon: {
    color: 'inherit',
  },
  logout: {
    color: theme.palette.secondary.main,
  },
  personalInfo: {
    marginBottom: theme.spacing(3),
  },
  personalInfoItem: {
    marginBottom: theme.spacing(2),
  },
  cardActions: {
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  noPurchaseIcon: {
    fontSize: theme.typography.fontSize * 7.25,
  },
}));

const Profile = (props) => {
  const classes = useStyles();
  const [profileOptionsOpen, setProfileOptionsOpen] = React.useState(true);
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  useEffect(() => {
    if (!auth.isAuthenticated) {
      history.push(routes.authentication);
    }

    dispatch(getUserRemoteInfo());
    dispatch(authActions.getUserLocalInfo());
  }, [history, dispatch, auth.isAuthenticated]);

  return (
    <Box mt={3} mb={5}>
      <Container maxWidth="xl">
        <Grid
          spacing={3}
          container
          direction="row"
          justify="space-between"
          alignItems="flex-start"
        >
          <Grid item container direction="column" xs={12} sm={12} md={4}>
            <Card>
              <CardContent>
                <List
                  disablePadding
                  className={classes.root}
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                  subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                      Quick Access
                    </ListSubheader>
                  }
                >
                  <ListItem
                    className={classes.listItem}
                    button
                    onClick={() =>
                      setProfileOptionsOpen((prevState) => !prevState)
                    }
                  >
                    <ListItemIcon className={classes.listItemIcon}>
                      <AccountCircleIconOutlined fontSize="large" />
                    </ListItemIcon>
                    <ListItemText
                      primary={`${auth.userInfo?.first_name} ${auth.userInfo?.last_name}`}
                      secondary={auth.userInfo?.mobile_phone}
                    />
                    {profileOptionsOpen ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>

                  <Collapse
                    in={profileOptionsOpen}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      <ListItem
                        button
                        className={[classes.nested, classes.listItem]}
                      >
                        <ListItemIcon className={classes.listItemIcon}>
                          <AccountBalanceWalletOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={`Wallet Balance : ${auth.userInfo?.balance}$`}
                        />
                      </ListItem>
                    </List>
                  </Collapse>
                  <Divider />
                  <Box clone mt={3}>
                    <ListItem className={classes.listItem} button>
                      <ListItemIcon className={classes.listItemIcon}>
                        <LocalMallOutlinedIcon fontSize="large" />
                      </ListItemIcon>
                      <ListItemText primary="Purchases" />
                    </ListItem>
                  </Box>
                  <ListItem className={classes.listItem} button>
                    <ListItemIcon className={classes.listItemIcon}>
                      <FavoriteBorderIcon fontSize="large" />
                    </ListItemIcon>
                    <ListItemText primary="Favorites" />
                  </ListItem>
                  <ListItem className={classes.listItem} button>
                    <ListItemIcon className={classes.listItemIcon}>
                      <ModeCommentOutlinedIcon fontSize="large" />
                    </ListItemIcon>
                    <ListItemText primary="Comments" />
                  </ListItem>
                  <ListItem className={classes.listItem} button>
                    <ListItemIcon className={classes.listItemIcon}>
                      <LocationOnOutlinedIcon fontSize="large" />
                    </ListItemIcon>
                    <ListItemText primary="Addresses" />
                  </ListItem>
                  <ListItem className={classes.listItem} button>
                    <ListItemIcon className={classes.listItemIcon}>
                      <EmailOutlinedIcon fontSize="large" />
                    </ListItemIcon>
                    <ListItemText primary="Message Inbox" />
                  </ListItem>
                  <ListItem className={classes.listItem} button>
                    <ListItemIcon className={classes.listItemIcon}>
                      <SettingsOutlinedIcon fontSize="large" />
                    </ListItemIcon>
                    <ListItemText primary="Personal Preferences" />
                  </ListItem>
                </List>
              </CardContent>
              <Divider />
              <CardActions>
                <ListItem
                  onClick={handleLogout}
                  className={classes.logout}
                  button
                >
                  <ListItemIcon>
                    <ExitToAppOutlinedIcon color="secondary" fontSize="large" />
                  </ListItemIcon>
                  <ListItemText primary="Log Out" />
                </ListItem>
              </CardActions>
            </Card>
          </Grid>
          <Grid item container direction="row" xs={12} sm={12} md={8}>
            <Grid item className={classes.personalInfo} xs={12}>
              <Card>
                <CardContent>
                  <Typography color="textPrimary" gutterBottom paragraph>
                    Personal Information
                  </Typography>
                  <Grid container direction="row">
                    <Grid item className={classes.personalInfoItem} xs={6}>
                      <Typography
                        color="textSecondary"
                        variant="subtitle1"
                        gutterBottom
                      >
                        Full Name
                      </Typography>
                      <Typography color="textPrimary" variant="h6" gutterBottom>
                        {`${auth.userInfo?.first_name} ${auth.userInfo?.last_name}`}
                      </Typography>
                    </Grid>
                    <Grid item className={classes.personalInfoItem} xs={6}>
                      <Typography
                        color="textSecondary"
                        variant="subtitle1"
                        gutterBottom
                      >
                        E-Mail
                      </Typography>
                      <Typography
                        noWrap
                        color="textPrimary"
                        variant="h6"
                        gutterBottom
                      >
                        {auth.userInfo?.email}
                      </Typography>
                    </Grid>
                    <Grid item className={classes.personalInfoItem} xs={6}>
                      <Typography
                        color="textSecondary"
                        variant="subtitle1"
                        gutterBottom
                      >
                        Phone Number
                      </Typography>
                      <Typography color="textPrimary" variant="h6" gutterBottom>
                        {auth.userInfo?.mobile_phone}
                      </Typography>
                    </Grid>
                    <Grid item className={classes.personalInfoItem} xs={6}>
                      <Typography
                        color="textSecondary"
                        variant="subtitle1"
                        gutterBottom
                      >
                        National ID
                      </Typography>
                      <Typography color="textPrimary" variant="h6" gutterBottom>
                        {auth.userInfo?.nat_code}
                      </Typography>
                    </Grid>
                    <Grid item className={classes.personalInfoItem} xs={6}>
                      <Typography
                        color="textSecondary"
                        variant="subtitle1"
                        gutterBottom
                      >
                        Account Status
                      </Typography>
                      <Typography color="textPrimary" variant="h6" gutterBottom>
                        {auth.userInfo?.is_active ? (
                          <VerifiedUserOutlinedIcon fontSize="large" />
                        ) : (
                          'Suspended'
                        )}
                      </Typography>
                    </Grid>
                    <Grid item className={classes.personalInfoItem} xs={6}>
                      <Typography
                        color="textSecondary"
                        variant="subtitle1"
                        gutterBottom
                      >
                        Account Verified
                      </Typography>
                      <Typography color="textPrimary" variant="h6" gutterBottom>
                        {auth.userInfo?.is_email_verified ? (
                          <VerifiedUserOutlinedIcon fontSize="large" />
                        ) : (
                          'Not yet'
                        )}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions className={classes.cardActions}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    size="large"
                  >
                    Edit Personal Information
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item className={classes.personalInfo} xs={12}>
              <Card>
                <CardContent>
                  <Typography color="textPrimary" gutterBottom>
                    Latest Purchases
                  </Typography>
                  {/* <Grid container></Grid> */}
                  <Grid container direction="column" alignItems="center">
                    <Grid item className={classes.noPurchaseIcon}>
                      <ErrorOutlineOutlinedIcon fontSize="inherit" />
                    </Grid>
                    <Grid item className={classes.noPurchaseText}>
                      <Typography
                        align="center"
                        color="textPrimary"
                        gutterBottom
                      >
                        You Have No Any Recent Purchases
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
                {/* <CardActions className={classes.cardActions}>
                  <Button fullWidth variant="outlined" size="large">
                    See All of The Purchases
                  </Button>
                </CardActions> */}
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Profile;
