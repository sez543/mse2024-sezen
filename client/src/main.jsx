import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import Provider from './stores/index.jsx';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {SnackbarProvider} from 'notistack';

import Login from './routes/Login';
import NewTopic from './routes/NewTopic';
import Register from './routes/Register';
import TopicPage from './routes/TopicPage';
import Topics from './routes/Topics';
import UserManagement from './routes/UserManagement';
import ProtectedRoute from './routes/ProtectedRoute';
import NotFound from './routes/NotFound.jsx';

const MAX_NOTIFICATION_STACK = 5;
const SNACKBAR_DURATION = 4000;

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    }
  }
});

export const applicationRoutes = [
  {
    path: '/',
    element: <ProtectedRoute component={<Topics/>} authRequired={true} />
  },
  {
    path: '/new-topic',
    element: <ProtectedRoute component={<NewTopic/>} authRequired={true} />
  },
  {
    path: '/topics',
    element: <ProtectedRoute component={<Topics/>} authRequired={true} />
  },
  {
    path: '/login',
    element: <ProtectedRoute component={<Login />} authRequired={false} />
  },
  {
    path: '/register',
    element: <ProtectedRoute component={<Register/>} authRequired={false} />
  },
  {
    path: '/topic-details/:id',
    element: <ProtectedRoute component={<TopicPage/>} authRequired={true} />
  },
  {
    path: '/manage-users',
    element: <ProtectedRoute component={<UserManagement/>} authRequired={true} adminOnly={true} />
  },
  {
    path: '*',
    element: <NotFound />
  }
];

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: applicationRoutes
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider>
      <ThemeProvider theme={darkTheme}>
        <SnackbarProvider
          classes={{
            containerAnchorOriginTopRight: 'notification_top_right',
            containerAnchorOriginTopLeft: 'notification_top_left'
          }}
          anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
          autoHideDuration={SNACKBAR_DURATION}
          maxSnack={MAX_NOTIFICATION_STACK}
        >
          <RouterProvider router={router} />
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
