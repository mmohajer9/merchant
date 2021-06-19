import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import Header from '../Header/Header';
import Homepage from '../../containers/Homepage/Homepage';
import routes from '../../common/routes';
import Cart from '../../containers/Cart/Cart';
import Profile from '../../containers/Profile/Profile';
import Footer from '../Footer/Footer';
import Authentication from '../../containers/Authentication/Authentication';
import { lightTheme, darkTheme, defaultTheme } from '../UI/Theme';
import { authActions } from '../../store/auth';
import getUserRemoteInfo from '../../store/auth/getUserRemoteInfo';

const App = () => {
  const setting = useSelector((state) => state.setting);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const theme =
    setting.theme === 'default'
      ? defaultTheme
      : setting.theme === 'dark'
      ? darkTheme
      : setting.theme === 'light'
      ? lightTheme
      : null;

  useEffect(() => {
    dispatch(authActions.setAxiosInstance());
  }, [auth.isAuthenticated, dispatch]);

  useEffect(() => {
    dispatch(getUserRemoteInfo());
    dispatch(authActions.getUserLocalInfo());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Switch>
          <Route exact path={routes.authentication}>
            <Authentication />
          </Route>
          {/* SEP */}
          <Route>
            <Header />
            <Route exact path={routes.homepage} component={Homepage} />
            <Route exact path={routes.cart} component={Cart} />
            <Route exact path={routes.profile}>
              {auth.isAuthenticated ? <Profile /> : null}
            </Route>
            <Footer />
          </Route>
        </Switch>
      </BrowserRouter>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default App;
