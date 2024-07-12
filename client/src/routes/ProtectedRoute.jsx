import {Navigate} from 'react-router-dom';
import { RedirectData } from '../utils/RedirectData';

const ProtectedRoute = ({component, authRequired, adminOnly}) => {
  const redirectData = RedirectData(authRequired, adminOnly);

  if (redirectData) {
    return <Navigate state={redirectData.state} to={redirectData.to} />;
  }

  return component;
};

export default ProtectedRoute;