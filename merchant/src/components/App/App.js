import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";

import theme from "../UI/Theme";
import Homepage from "../../containers/Homepage/Homepage";
import routes from "../../common/routes";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route exact path={routes.homepage} component={Homepage} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
