import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';

import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import HomeOutlined from '@material-ui/icons/HomeOutlined';

import routes from '../../../common/routes';
import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  tabContainer: {
    marginLeft: 'auto',
  },
  tab: {
    textTransform: 'none',
    fontWeight: '700',
    minWidth: 80,
    '& svg': {
      fontSize: '2rem',
    },
  },
  inlineTab: {
    flexDirection: 'row',
    padding: '.7em',
    borderRadius: theme.shape.borderRadius + 3,
    borderColor: fade(theme.palette.common.grey, 0.4),
    borderStyle: 'solid',
    '&:hover': {
      color: fade(theme.palette.common.black, 1),
      borderColor: fade(theme.palette.common.black, 1),
    },
    '& svg': {
      marginBottom: '0 !important',
      marginRight: '0.2em',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius + 3,
    borderColor: fade(theme.palette.common.grey, 0.4),
    borderStyle: 'solid',
    backgroundColor: fade(theme.palette.common.lightGrey, 1),
    '&:hover': {
      borderColor: fade(theme.palette.common.grey, 1),
    },
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(4),
    width: '40%',
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    padding: theme.spacing(1.2, 1, 1.2, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

const Navigation = (props) => {
  const classes = useStyles();
  const location = useLocation();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const auth = useSelector((state) => state.auth);

  const [value, setValue] = useState(
    location.pathname === routes.cart
      ? 1
      : location.pathname === routes.homepage
      ? 2
      : 0
  );

  useEffect(() => {
    const tabValue =
      location.pathname === routes.cart
        ? 1
        : location.pathname === routes.homepage
        ? 2
        : 0;
    setValue(tabValue);
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Toolbar disableGutters={matches}>
        <Button
          variant="contained"
          color="secondary"
          disableRipple
          component={Link}
          to={routes.homepage}
        >
          <Typography variant="h5">Merchant</Typography>
        </Button>
        <Box className={classes.search}>
          <Box className={classes.searchIcon}>
            <SearchOutlinedIcon />
          </Box>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </Box>
        <Tabs
          onChange={handleChange}
          value={value}
          className={classes.tabContainer}
          indicatorColor="secondary"
        >
          <Tab
            disableRipple
            className={classes.tab}
            component={Link}
            to={auth.isAuthenticated ? routes.profile : routes.authentication}
            classes={{
              wrapper: classes.inlineTab,
            }}
            label={
              auth.isAuthenticated
                ? auth.userInfo?.username
                : 'Login into your account'
            }
            icon={<PersonOutlineOutlinedIcon />}
          />
          <Tab
            component={Link}
            to={routes.cart}
            disableRipple
            className={classes.tab}
            icon={<ShoppingCartOutlinedIcon />}
          />
          <Tab
            component={Link}
            to={routes.homepage}
            disableRipple
            className={classes.tab}
            icon={<HomeOutlined />}
          />
        </Tabs>
      </Toolbar>
    </>
  );
};

export default Navigation;
