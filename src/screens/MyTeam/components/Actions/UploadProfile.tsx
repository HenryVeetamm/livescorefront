
import FileUpload, { FileType } from 'components/FileUpload/FileUpload';
import { pictureUploadUrl, playerApi, tags } from 'app/services/player';
import { UploadOutlined } from '@ant-design/icons';
import { TooltipButton } from 'components/TooltipButton/TooltipButton';
import { useDispatch } from 'react-redux';

const UploadProfile = ({ id }: { id: string }) => {

  const dispatch = useDispatch();
  const handleSuccess = () => dispatch(playerApi.util.invalidateTags([ tags.MY_PLAYERS ]));

  return <FileUpload
    uploadUrl={pictureUploadUrl.replace(':id',id)}
    type={FileType.IMAGE}
    handleSuccess={handleSuccess}
    button={<TooltipButton
      title='Lae üles profiilipilt'
      buttonProps={{ icon:<UploadOutlined />, type: 'link' }} />}/>;

};

export default UploadProfile;