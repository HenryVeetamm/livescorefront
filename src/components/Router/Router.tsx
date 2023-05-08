import { Paths } from 'constants/paths';
import Authorize from 'components/Authorized/Authorize';
import AuthorizedStrict from 'components/Authorized/AuthorizedStrict';
import NotFound from 'components/NotFound/NotFound';
import { Route, Routes } from 'react-router-dom';
import AdminView from 'screens/Admin/View';
import Game from 'screens/Games/Game';
import Games from 'screens/Games/Games';
import Home from 'screens/Home/Home';
import MyGames from 'screens/MyGames/MyGames';
import MyTeam from 'screens/MyTeam/MyTeam';
import Team from 'screens/Teams/Team';
import Teams from 'screens/Teams/Teams';
import Layout from '../Layout/Layout';

const Router = () => {
  return (
    <Routes>
      <Route element={<AuthorizedStrict><Layout /></AuthorizedStrict>}>
        <Route index element={<Home/>}/>

        <Route path={Paths.MY_TEAM} element={<MyTeam/>}/>
        <Route path={Paths.MY_GAMES} element={<MyGames/>}/>

        <Route path={Paths.ADMIN} element={<AdminView/>}/>

      </Route>
      <Route element={<Authorize><Layout/></Authorize>}>
        <Route path={Paths.HOME} element={<Home/>}/>
        <Route path={Paths.GAMES} element={<Games/>}/>
        <Route path={Paths.GAME} element={<Game/>}/>

        <Route path={Paths.TEAMS} element={<Teams/>} />
        <Route path={Paths.TEAM} element={<Team/>} />

        <Route path={Paths.NOT_FOUND} element={<NotFound/>}/>
        <Route path={'*'} element={<NotFound/>}/>
      </Route>
    </Routes>
  );
};

export default Router;