import {
  HomeOutlined,
  TeamOutlined,
} from '@ant-design/icons';

import { Menu, MenuProps } from 'antd';
import { selectors } from 'app/services/session/slice';
import { Paths } from 'constants/paths';
import useScreenBreakpoint from 'hooks/useScreenBreakpoint';
import { TeamsIcon, VolleyballIcon } from 'icons';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { findActiveKeys, getAllKeys } from 'utils/menu';
import './styles.less';


const MenuNavigation = () => {
  const authData = useSelector(selectors.getAuthData);
  const { isLarge } = useScreenBreakpoint();

  //ANON/ALL
  //1.Kõik mängud: /games
  //2.Informatsioon:Mingi basic suur tekst. Miks/Milleks/Kuidas/Muu info: /info
  //3.Avalehele. (Anonüümne saadetakse landing pagele) (Audenditud kasutajad saadetakse dashboardile): / või /dashboard
  //Koheselt mitte vajalik. Võistkonnad, võistkondade detailvaade.

  //Audenditud kasutajad
  //4.Minu võistkond. Saab lisada/vaadata/muuta mängijaid: /my-team
  //5.Minu mängud. Toimunud/Tulemas mängud: /my-games
  //6.Dashboard: Sama mis avalehele
  //Mingi vaade, et lisada mänge, või siis lisada asi dashboardile. Kas ka lisada mängude confirmimine.
  //Also võimalus lisada kiirelt mäng. Mida saab ise täita.

  //Admin menüüd?

  const menuItems: MenuProps['items'] = [
    {
      label: <NavLink to={Paths.HOME}>Avaleht</NavLink>,
      key: Paths.HOME,
      icon: <HomeOutlined />,
    },
    {
      label: <NavLink to={Paths.GAMES}>Mängud</NavLink>,
      key: Paths.GAMES,
      icon: <VolleyballIcon/>,
    },
    {
      label: <NavLink to={Paths.TEAMS}>Võistkonnad</NavLink>,
      key: Paths.TEAMS,
      icon: <TeamsIcon/>,
    },
  ];

  if (authData && authData.role === 'user') {
    const authenticatedMenus: MenuProps['items'] = [
      {
        label: <NavLink to={Paths.MY_TEAM}>Minu võistkond</NavLink>,
        key: Paths.MY_TEAM,
        icon: <TeamOutlined />,
      },
      {
        label: <NavLink to={Paths.MY_GAMES}>Minu mängud</NavLink>,
        key: Paths.MY_GAMES,
        icon: <VolleyballIcon/>
      },
    ];
    menuItems.push(...authenticatedMenus);
  }

  if (authData && authData.role === 'admin') {
    const authenticatedMenus: MenuProps['items'] = [
      {
        label: <NavLink to={Paths.ADMIN}>Admin</NavLink>,
        key: Paths.ADMIN,
        icon: <VolleyballIcon/>
      },
    ];
    menuItems.push(...authenticatedMenus);
  }

  const [ openMenuItems, setOpenMenuItems ] = useState<string[]>(findActiveKeys(getAllKeys(menuItems)));

  const location = useLocation();
  useEffect(()=> {
    const activeKeys = findActiveKeys(getAllKeys(menuItems));
    setOpenMenuItems(activeKeys);
  }, [ location ]);

  return <Menu
    selectedKeys={openMenuItems}
    mode="horizontal"
    items={menuItems}
    className={`${isLarge ? 'centerStyle' : '' } `}
  />;
};

export default MenuNavigation;