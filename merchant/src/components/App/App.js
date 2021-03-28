import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";

// eslint-disable-next-line no-unused-vars
import { lightTheme, darkTheme } from "../UI/Theme";
import Header from "../Header/Header";
import Homepage from "../../containers/Homepage/Homepage";
import routes from "../../common/routes";
import Cart from "../../containers/Cart/Cart";
import Panel from "../../containers/Panel/Panel";
import Login from "../../containers/Login/Login";
import Signup from "../../containers/Signup/Signup";

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        <Switch>
          <Route exact path={routes.login} component={Login} />
          <Route exact path={routes.signup} component={Signup} />
          {/*  */}
          <Header />
          <Route exact path={routes.homepage} component={Homepage} />
          <Route exact path={routes.cart} component={Cart} />
          <Route exact path={routes.panel} component={Panel} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
