import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const merchantWhite = '#FFFFFF';
const merchantRed = '#F24E45';
const merchantGrey = '#6F6F6F';
const merchantLightGrey = '#F6F6F6';
const merchantHoveredItem = '#11ABC6';

let lightTheme = createMuiTheme({
  palette: {
    common: {
      white: merchantWhite,
      red: merchantRed,
      lightGrey: merchantLightGrey,
      grey: merchantGrey,
      hovered: merchantHoveredItem,
    },
    primary: {
      main: merchantWhite,
    },
    secondary: {
      main: merchantRed,
    },
  },
  overrides: {
    MuiInput: {
      underline: {
        '&:after': {
          borderBottom: '2px solid black',
        },
      },
    },
    MuiFormLabel: {
      root: {
        '&$focused': {
          color: 'inherit',
        },
      },
    },
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
});

let darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

let defaultTheme = createMuiTheme();

lightTheme = responsiveFontSizes(lightTheme);
darkTheme = responsiveFontSizes(darkTheme);
defaultTheme = responsiveFontSizes(defaultTheme);

export { lightTheme, darkTheme, defaultTheme };
