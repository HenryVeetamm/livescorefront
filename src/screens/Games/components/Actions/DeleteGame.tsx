import { Button } from 'antd';
import { useDeleteGameMutation } from 'app/services/game';
import useScreenBreakpoint from 'hooks/useScreenBreakpoint';
import { DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Paths } from 'constants/paths';

const DeleteGameButton = ({ gameId } : { gameId: string }) => {
  const [ deleteGame, meta ] = useDeleteGameMutation();
  const { isMedium } = useScreenBreakpoint();
  const navigate = useNavigate();

  const handleDeleteGame = async () => {
    await deleteGame(gameId);
    navigate(Paths.GAMES);
  };

  return <Button
    icon={<DeleteOutlined />}
    onClick={handleDeleteGame}
    style={!isMedium ? { width: '100%' } : {} }
    type={'primary'}
    danger
    loading={meta.isLoading}
  >Kustuta mäng</Button>;
};

export default DeleteGameButton;