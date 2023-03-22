import { gameApi, tags, useStartGameMutation } from 'app/services/game';
import { useDispatch } from 'react-redux';
import { Button } from 'antd';
import useScreenBreakpoint from 'hooks/useScreenBreakpoint';
import { WhistleIcon } from 'icons';

const StartGameButton = ({ gameId } : { gameId : string }) => {
  const [ startGame ] = useStartGameMutation();
  const dispatch = useDispatch();
  const { isMedium } = useScreenBreakpoint();

  const onStartClick = async () => {
    await startGame(gameId);
    dispatch(gameApi.util.invalidateTags([ tags.GAME ]));
  };

  return <Button
    icon={<WhistleIcon/>}
    onClick={onStartClick}
    style={!isMedium ? { width: '100%', backgroundColor: 'green' } : { backgroundColor: 'green' }}
    type='primary'
  >Alusta mänguga</Button>;
};

export default StartGameButton;