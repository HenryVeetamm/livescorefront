import { Upload } from 'antd';
import { getAuthorizationHeader } from 'app/api';
import type { RcFile, UploadProps } from 'antd/es/upload';
import { ReactElement } from 'react';
import every from 'lodash/every';

export enum FileType {
  IMAGE,
  ALL,
  PDF,
}

export enum RenderType {
  GALLERY
}

type FileUploadProps = {
  uploadUrl?: string,
  type?: FileType,
  handleSuccess?: any,
  button: ReactElement
};

const FileUpload = (props: FileUploadProps) => {
  const { uploadUrl, type, handleSuccess, button } = props;

  const headers = { 'Authorization': getAuthorizationHeader() || '' };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList, file: currentFile }) => {
    const allDone = every(newFileList, f => f.status === 'done') || currentFile.status === 'done';

    if (allDone && handleSuccess) handleSuccess();
  };


  const beforeUpload = (file: RcFile) => {
    let isValid = !type || type === FileType.ALL;

    if (type === FileType.IMAGE) isValid = /^(image)\//i.test(file.type);

    if (type === FileType.PDF) isValid = file.type === accept;

    if (!isValid) {

      return Upload.LIST_IGNORE;
    }
  };

  const accept = type === FileType.ALL ? undefined : type === FileType.PDF ? 'application/pdf' : 'image/*';

  return <Upload
    action={uploadUrl}
    onChange={handleChange}
    beforeUpload={beforeUpload}
    accept={accept}
    headers={headers}
    showUploadList={false}
  >
    {button}
  </Upload>;

};

export default FileUpload;