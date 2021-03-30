import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";

import MenuOutlinedIcon from "@material-ui/icons/MenuOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "space-between",
    [theme.breakpoints.up("sm")] : {
      paddingLeft : theme.mixins.gutters().paddingLeft,
      paddingRight : theme.mixins.gutters().paddingRight
    }
  },
}));

const DrawerToolbar = (props) => {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const drawerList = (
    <Box
      width={250}
      role="container"
      onClick={() => setOpenDrawer(false)}
      onKeyDown={() => setOpenDrawer(false)}
    >
      <List>
        <ListItem divider button>
          <ListItemIcon>
            <SearchOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Sample List Item Text" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <Toolbar
        classes={{
          root: classes.root,
        }}
      >
        <SwipeableDrawer
          disableBackdropTransition={!iOS}
          disableDiscovery={iOS}
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
          onOpen={() => setOpenDrawer(true)}
        >
          {drawerList}
        </SwipeableDrawer>
        <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
          <MenuOutlinedIcon />
        </IconButton>
        <Typography variant="h5">Merchant</Typography>
        <IconButton>
          <HelpOutlineOutlinedIcon />
        </IconButton>
      </Toolbar>
    </>
  );
};

export default DrawerToolbar;
