import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";

// eslint-disable-next-line no-unused-vars
import { lightTheme, darkTheme, defaultTheme } from "../UI/Theme";
import Header from "../Header/Header";
import Homepage from "../../containers/Homepage/Homepage";
import routes from "../../common/routes";
import Cart from "../../containers/Cart/Cart";
import Panel from "../../containers/Panel/Panel";
import Login from "../../containers/Login/Login";
import Signup from "../../containers/Signup/Signup";
import Footer from "../Footer/Footer";

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Switch>
          <Route exact path={routes.login}>
            <Login />
          </Route>
          <Route exact path={routes.signup}>
            <Signup />
          </Route>
          {/* SEP */}
          <Route>
            <Header />
            <Route exact path={routes.homepage} component={Homepage} />
            <Route exact path={routes.cart} component={Cart} />
            <Route exact path={routes.panel} component={Panel} />
            <Footer />
          </Route>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
