import { useLogin } from '../hooks';

export const RedirectData = (authRequired, adminOnly) => {
  const {isLoggedIn, role} = useLogin();

  if (adminOnly && role !== 'ADMIN') {
    const routeAlert = {message: 'Insufficient permisson to access this page!', severity: 'error'};
    return {
      state: {alert: routeAlert},
      to: isLoggedIn ? '/' : '/login'
    };
  }

  if (!isLoggedIn && authRequired) {
    const routeAlert = {message: 'Please log into your account to access the page!', severity: 'error'};
    return {
      state: {alert: routeAlert},
      to: '/login'
    };
  }

  if (isLoggedIn && !authRequired) {
    const routeAlert = {message: 'Welcome back!', severity: 'success'};
    return {
      state: {alert: routeAlert},
      to: '/'
    };
  }

  return false;
};
