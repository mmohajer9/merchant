import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import theme from "../UI/Theme";
import Header from "../Header/Header";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      Hello !
    </ThemeProvider>
  );
};

export default App;
