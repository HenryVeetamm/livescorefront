import { selectors } from 'app/services/session/slice';
import { Paths } from 'constants/paths';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import LandingPage from 'screens/LandingPage/LandingPage';

const Home = () => {
  const isAuthenticated = useSelector(selectors.isAuthenticated);
  return isAuthenticated ? <Navigate to={Paths.DASHBOARD}/> : <LandingPage/>;
};

export default Home;

