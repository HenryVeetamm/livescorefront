
import FileUpload, { FileType } from 'components/FileUpload/FileUpload';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { tags, teamApi, teamLogoUploadUrl } from 'app/services/team';
import CustomButton from 'components/Button/CustomButton';

const UploadTeamLogo = ({ id }: { id: string }) => {

  const dispatch = useDispatch();
  const handleSuccess = () => dispatch(teamApi.util.invalidateTags([ tags.MY_TEAM ]));

  return <FileUpload
    uploadUrl={teamLogoUploadUrl.replace(':id',id)}
    type={FileType.IMAGE}
    handleSuccess={handleSuccess}
    button={<CustomButton
      title='Lae üles tiimi logo'
      buttonProps={{ icon:<UploadOutlined />, type: 'link' }} />}/>;

};

export default UploadTeamLogo;