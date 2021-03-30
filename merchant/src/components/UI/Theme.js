import { createMuiTheme } from "@material-ui/core/styles";

const merchantWhite = "#FFFFFF";
const merchantRed = "#F24E45";
const merchantLightGrey = "#F0F0F1";
const merchantGrey = "#6F6F6F";

const lightTheme = createMuiTheme({
  palette: {
    common: {
      white: merchantWhite,
      red: merchantRed,
      lightGrey: merchantLightGrey,
      grey: merchantGrey,
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

console.log(lightTheme)

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

export { lightTheme, darkTheme };
