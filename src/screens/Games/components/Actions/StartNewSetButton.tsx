import { RedoOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useStartNewSetMutation } from 'app/services/game';
import useScreenBreakpoint from 'hooks/useScreenBreakpoint';

const StartNewSetButton = ({ gameId } : { gameId: string }) => {
  const [ startNewSet ] = useStartNewSetMutation();
  const { isMedium } = useScreenBreakpoint();

  const onStartNewSet = async () => {
    await startNewSet(gameId);
  };
  return <Button
    icon={<RedoOutlined />}
    onClick={onStartNewSet}
    style={!isMedium ? { width: '100%' } : {}}
    type={'primary'}
  >
    Alusta uue geimiga
  </Button>;
};

export default StartNewSetButton;