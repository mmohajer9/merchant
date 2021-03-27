import { createMuiTheme } from "@material-ui/core/styles";

const merchantWhite = "#FFFFFF";
const merchantRed = "#F24E45";

export default createMuiTheme({
  palette: {
    common: {
      white: merchantWhite,
      red: merchantRed,
    },
    primary: {
      main: merchantWhite,
    },
    secondary: {
      main: merchantRed,
    },
  },
});
