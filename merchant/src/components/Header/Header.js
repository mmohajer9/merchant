import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  InputBase,
  useScrollTrigger,
  AppBar,
  Toolbar,
  fade,
  Typography,
  Tabs,
  Tab,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import SearchIcon from "@material-ui/icons/Search";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import PhoneOutlinedIcon from "@material-ui/icons/PhoneOutlined";

import Popover from "./Popover";
import routes from "../../common/routes";

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar, // contains the height of appbar
    marginBottom: "1.2em",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius + 3,
    borderColor: fade(theme.palette.common.grey, 0.4),
    borderStyle: "solid",
    backgroundColor: fade(theme.palette.common.lightGrey, 1),
    "&:hover": {
      borderColor: fade(theme.palette.common.grey, 1),
    },
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(4),
    width: "35%",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    padding: theme.spacing(1.2, 1, 1.2, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
  tabContainer: {
    marginLeft: "auto",
  },
  tab: {
    textTransform: "none",
    fontWeight: "700",
    minWidth: 80,
    "&:hover": {
      color: fade(theme.palette.common.black, 1),
    },
    "& svg": {
      fontSize: "2rem",
    },
  },
  inlineTab: {
    flexDirection: "row",
    padding: ".7em",
    borderRadius: theme.shape.borderRadius + 3,
    borderColor: fade(theme.palette.common.grey, 0.4),
    borderStyle: "solid",
    "&:hover": {
      color: fade(theme.palette.common.black, 1),
      borderColor: fade(theme.palette.common.black, 1),
    },
    "& svg": {
      marginBottom: "0 !important",
      marginRight: "0.2em",
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  const location = useLocation();
  const [value, setValue] = React.useState(
    location.pathname === routes.cart
      ? 2
      : location.pathname === routes.aboutus
      ? 4
      : location.pathname === routes.contactus
      ? 6
      : null
  );
  const handleChange = (event, value) => {
    setValue(value);
  };

  return (
    <>
      <ElevationScroll>
        <AppBar position="fixed">
          {/* you can use the props : disableGutters to remove the left and right padding */}
          <Toolbar>
            <Typography variant="h5">Merchant</Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
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
                to={routes.login}
                classes={{
                  wrapper: classes.inlineTab,
                }}
                label="Login / Signup"
                icon={<PersonOutlineOutlinedIcon />}
              />
              <Divider orientation="vertical" flexItem />
              <Tab
                component={Link}
                to={routes.cart}
                disableRipple
                className={classes.tab}
                icon={<ShoppingCartOutlinedIcon />}
              />
              <Divider orientation="vertical" flexItem />
              <Tab
                component={Link}
                to={routes.aboutus}
                disableRipple
                className={classes.tab}
                icon={<HelpOutlineOutlinedIcon />}
              />
              <Divider orientation="vertical" flexItem />
              <Tab
                component={Link}
                to={routes.contactus}
                disableRipple
                className={classes.tab}
                icon={<PhoneOutlinedIcon />}
              />
            </Tabs>
          </Toolbar>
          <Divider orientation="horizontal" />
          <Toolbar>
            <Popover />
          </Toolbar>
          <Divider orientation="horizontal" />
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin}></div>
    </>
  );
};

export default Header;
