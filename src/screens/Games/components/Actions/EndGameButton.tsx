import { Button } from 'antd';
import { gameApi, tags, useEndGameMutation } from 'app/services/game';
import useScreenBreakpoint from 'hooks/useScreenBreakpoint';
import { Stop } from 'icons';
import { useDispatch } from 'react-redux';

const EndGameButton = ({ gameId } : { gameId: string }) => {
  const [ endGame ] = useEndGameMutation();
  const dispatch = useDispatch();
  const { isMedium } = useScreenBreakpoint();

  const handleEndGame = async () => {
    await endGame(gameId);
    dispatch(gameApi.util.invalidateTags([ tags.GAMES, tags.MYGAMES ]));
  };

  return <Button
    icon={<Stop/>}
    onClick={handleEndGame}
    style={!isMedium ? { width: '100%', backgroundColor: 'rgb(252, 59, 20)' } : { backgroundColor: 'rgb(252, 59, 20)' }}
    type={'primary'}
  >Lõpeta mäng</Button>;
};

export default EndGameButton;