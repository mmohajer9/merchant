import React from 'react';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  makeStyles,
  Typography,
} from '@material-ui/core';
import AccountCircleIconOutlined from '@material-ui/icons/AccountCircleOutlined';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

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
}));

const Profile = (props) => {
  const classes = useStyles();
  const [profileOptionsOpen, setProfileOptionsOpen] = React.useState(true);

  return (
    <Box mt={3}>
      <Container maxWidth="xl">
        <Grid spacing={3} container direction="row" justify="space-between" alignItems="flex-start">
          <Grid item container direction="column" xs={12} sm={4}>
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
                    onClick={() => setProfileOptionsOpen((prevState) => !prevState)}
                  >
                    <ListItemIcon className={classes.listItemIcon}>
                      <AccountCircleIconOutlined fontSize="large" />
                    </ListItemIcon>
                    <ListItemText primary="Mohammad Mahdi Mohajer" secondary="09115269909" />
                    {profileOptionsOpen ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={profileOptionsOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItem button className={[classes.nested, classes.listItem]}>
                        <ListItemIcon className={classes.listItemIcon}>
                          <AccountBalanceWalletOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Wallet Balance : 5000$" />
                      </ListItem>
                    </List>
                  </Collapse>
                  <ListItem className={classes.listItem} button>
                    <ListItemIcon className={classes.listItemIcon}>
                      <LocalMallOutlinedIcon fontSize="large" />
                    </ListItemIcon>
                    <ListItemText primary="Purchases" />
                  </ListItem>
                  <ListItem className={classes.listItem} button>
                    <ListItemIcon className={classes.listItemIcon}>
                      <FavoriteBorderIcon fontSize="large" />
                    </ListItemIcon>
                    <ListItemText primary="Favorites" />
                  </ListItem>
                  <ListItem gutt className={classes.listItem} button>
                    <ListItemIcon className={classes.listItemIcon}>
                      <ModeCommentOutlinedIcon fontSize="large" />
                    </ListItemIcon>
                    <ListItemText primary="Comments" />
                  </ListItem>
                  <ListItem gutt className={classes.listItem} button>
                    <ListItemIcon className={classes.listItemIcon}>
                      <LocationOnOutlinedIcon fontSize="large" />
                    </ListItemIcon>
                    <ListItemText primary="Addresses" />
                  </ListItem>
                  <ListItem gutt className={classes.listItem} button>
                    <ListItemIcon className={classes.listItemIcon}>
                      <EmailOutlinedIcon fontSize="large" />
                    </ListItemIcon>
                    <ListItemText primary="Message Inbox" />
                  </ListItem>

                  <ListItem gutt className={classes.listItem} button>
                    <ListItemIcon className={classes.listItemIcon}>
                      <PermIdentityOutlinedIcon fontSize="large" />
                    </ListItemIcon>
                    <ListItemText primary="Personal Preferences" />
                  </ListItem>
                </List>
              </CardContent>
              <CardActions></CardActions>
            </Card>
          </Grid>
          <Grid item container direction="column" xs={12} sm={8}>
            <Card>
              <CardContent>
                <Typography color="" gutterBottom>
                  Word of the Day
                </Typography>
              </CardContent>
              <CardActions></CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Profile;
