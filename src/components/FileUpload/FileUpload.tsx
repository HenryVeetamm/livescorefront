import { Upload } from 'antd';
import { getAuthorizationHeader } from 'app/api';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
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

type actionButtons = {
  showDownload: boolean;
  showPreview: boolean;
  showDelete: boolean;
}

type FileUploadProps = {
  uploadUrl?: string,
  limit?: number,
  type?: FileType,
  initialValues?: UploadFile[],
  deleteCallback?: (id: string) => void,
  listType?: any,
  renderType?: RenderType,
  handleSuccess?: any,
  actions?: actionButtons,
  readonly?: boolean,
  button: ReactElement
};

const FileUpload = (props: FileUploadProps) => {
  const { uploadUrl, type, listType, handleSuccess, button } = props;


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

  //   const uploadButton = () => (
  //     type === FileType.IMAGE ?
  //       <div>
  //         <PlusOutlined />
  //         <div>{t('common.upload.title')}</div>
  //       </div>
  //       :
  //       <Button type="primary" icon={<UploadOutlined />}>
  //         {t('common.upload.title')}
  //       </Button>
  //   );

  const accept = type === FileType.ALL ? undefined : type === FileType.PDF ? 'application/pdf' : 'image/*';
  //   const renderContent = () => {
  //     switch (renderType) {
  //       case RenderType.GALLERY: {
  //         return (fileList &&
  //           <Gallery
  //             galleryOpen={previewOpen}
  //             onVisibleChange={setPreviewOpen}
  //             fileList={fileList}
  //             previewImage={previewImage}
  //           />
  //         );
  //       }
  //       default:
  //         return (
  //           <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
  //             <img alt="example" className='image-preview' src={previewImage} />
  //           </Modal>
  //         );
  //     }
  //   };


  return <Upload
    action={uploadUrl}
    listType={listType}
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