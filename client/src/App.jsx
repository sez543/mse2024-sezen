import * as React from 'react';
import {Outlet, useLocation} from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import {useSnackbar} from 'notistack';

const App = () => {
  const location = useLocation();
  const routeState = location && typeof location === 'object' ? location.state : null;
  const stateAlert = routeState ? routeState.alert : null;
  const {enqueueSnackbar} = useSnackbar();

  React.useEffect(() => {
    if (stateAlert) {
      enqueueSnackbar(stateAlert.message, {variant: stateAlert.severity});
    }
  }, [stateAlert]);

  window.history.replaceState({}, '');

  return (
    <div className="outer-route">
      <Header />
      <div className="inner-route">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default App;
