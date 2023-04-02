import { EditOutlined } from '@ant-design/icons';
import { TooltipButton } from 'components/TooltipButton/TooltipButton';

type EditPlayerProps = {
  onClick?: any
}

const EditPlayer = ({ onClick } : EditPlayerProps) => {
  return<>
    <TooltipButton
      title={'Muuda'}
      buttonProps={{
        icon: <EditOutlined/>,
        onClick: () => onClick(),
        type: 'link'

      }}
    />
  </>;
};

export default EditPlayer;