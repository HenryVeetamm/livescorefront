import { Card, Skeleton, Space, Tabs, TabsProps } from 'antd';
import { useLazyGetGameQuery } from 'app/services/game';
import { actions, selectors as gameSelector } from 'app/services/game/slice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PlayerTable from './components/Editor/PlayerTable';
import GameInfo from './components/GameDetails/GameInfo';
import Score from './components/GameDetails/Score';


const Game = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const game = useSelector(gameSelector.getGame);
  const [ getGame ] = useLazyGetGameQuery();

  useEffect(() => {

    if(params.id) getGame(params.id);
    // if(game && game.gameStatus == GameStatus.Started) {
    dispatch(actions.setConnect({ gameId : params.id }));

    return () => {
      dispatch(actions.setDisconnect());
      dispatch(actions.clearGame());
    };
  }, [ ]);

  const getItems = () => {
    const items: TabsProps['items'] = [
      {
        key: '1',
        label: 'Mängu info',
        children: game && <GameInfo game={game}/>
      },
      {
        key: '2',
        label: 'Koduvõistkond',
        children: game && game.homeTeam && <PlayerTable teamId={game.homeTeam.id} gameId={game.id} gameStatus={game.gameStatus}/>
      },

    ];

    if (game && game.awayTeam) items.push({
      key: '3',
      label: 'Võõrsil võistkond',
      children: game && game.awayTeam && <PlayerTable teamId={game.awayTeam.id} gameId={game.id} gameStatus={game.gameStatus}/>
    });

    return items;
  };

  if (!game) return <Skeleton active/>;

  return <>
    <Space direction="vertical" size='middle' style={{ display: 'flex' }}>
      <Score game={game}/>
      <Card className='under'>
        <Tabs items={getItems()}>
        </Tabs>
      </Card>
    </Space>
  </>;
};

export default Game;