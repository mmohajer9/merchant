import React from "react";
import {
  useScrollTrigger,
  AppBar,
  Divider,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

import NavigationToolbar from "./fragments/NavigationToolbar";
import OptionsToolbar from "./fragments/OptionsToolbar";
import DrawerToolbar from "./fragments/DrawerToolbar";

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

const Header = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <ElevationScroll>
        <AppBar position="sticky">
          {matches ? <DrawerToolbar /> : <NavigationToolbar />}
          <Divider orientation="horizontal" />
          <OptionsToolbar />
          <Divider orientation="horizontal" />
        </AppBar>
      </ElevationScroll>
    </>
  );
};

export default Header;
