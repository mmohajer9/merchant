import { createMuiTheme } from "@material-ui/core/styles";

const merchantWhite = "#FFFFFF";
const merchantRed = "#F24E45";
const merchantLightGray = "#F0F0F1";
const merchantGray = "#6F6F6F"

export default createMuiTheme({
  palette: {
    common: {
      white: merchantWhite,
      red: merchantRed,
      lightGray: merchantLightGray,
      gray: merchantGray,
    },
    primary: {
      main: merchantWhite,
    },
    secondary: {
      main: merchantRed,
    },
  },
  // typography: {

  // }
});
