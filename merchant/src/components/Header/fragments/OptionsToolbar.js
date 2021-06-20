import React from 'react';
import { useMediaQuery } from '@material-ui/core';
import { fade, useTheme, makeStyles } from '@material-ui/core/styles';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import Box from '@material-ui/core/Box';
import InputBase from '@material-ui/core/InputBase';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';

import routes from '../../../common/routes';

const useStyles = makeStyles((theme) => ({
  inlineTab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tab: {
    marginRight: '1rem',
    marginLeft: '1rem',
    minWidth: 30,
    padding: 0,
    textTransform: 'none',
    '& svg': {
      fontSize: '2rem',
      marginRight: '0.5rem',
    },
  },
  tabContainer: {
    marginLeft: 'auto',
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
    marginRight: 'auto',
    marginLeft: theme.spacing(2),
    width: '80%',
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

export default function CustomizedMenus() {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const searchBar = (
    <>
      <Toolbar disableGutters={matches}>
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
        <Tab
          disableRipple
          className={classes.tab}
          component={Link}
          to={routes.authentication}
          icon={<PersonOutlineOutlinedIcon />}
        />
        <Tab
          component={Link}
          to={routes.cart}
          disableRipple
          className={classes.tab}
          icon={<ShoppingCartOutlinedIcon />}
        />
      </Toolbar>
    </>
  );

  const megaMenu = (
    <>
      <Toolbar disableGutters={true}></Toolbar>
    </>
  );

  return <>{matches ? searchBar : megaMenu}</>;
}
