import React from 'react';
import { FiUploadCloud } from 'react-icons/fi';
import { useDocumentContext } from '../../index';
import { uploadFile } from '../../api/Document.api';
import { AxiosProgressEvent } from 'axios';
import uuid from 'react-uuid';

const Index = () => {

  const {
    primaryColor,
    listProgressFiles,
    setListProgressFiles,
    externalReferenceCode,
    moduleId,
    appId,
    setReloadData
  } = useDocumentContext();

  const primaryTextColor = {
    color: primaryColor
  };

  const secondBgColor = {
    backgroundColor: primaryColor + '11'
  };

  function uploadMultipleFiles(fileList: any) {

    const length = fileList?.length;

    for (let i = 0; i < length; i++) {

      upload(fileList[i]);
    }
  }

  function upload(file: File) {

    const cloneListProgressFiles = { ...listProgressFiles };

    const formData = new FormData();

    formData.append('metadata', JSON.stringify({ appId, moduleId }));
    formData.append('pkCode', externalReferenceCode);
    formData.append('parentId', '0');
    formData.append('category', 'attached');
    formData.append('file', file);

    const uid = uuid();

    const initProgressFile = mapFileItem({
      uid,
      name: file.name
    }, 0);

    setListProgressFiles((state: any) => {

      const cloneState: any = { ...state };

      cloneState[uid] = initProgressFile;

      return { ...cloneState };
    });

    const onUploadProgress = (progressEvent: AxiosProgressEvent) => {

      const total = progressEvent?.total || 0;
      const loaded = progressEvent?.loaded;

      let percent = (loaded / total) * 100;

      percent = percent === 100 ? 99 : parseInt(String(percent));

      setListProgressFiles((state: any) => {

        const cloneState: any = { ...state };

        cloneState[uid] = mapFileItem(initProgressFile, percent);

        return { ...cloneState };
      });
    };

    uploadFile(formData, onUploadProgress).then(r => {

      setListProgressFiles((state: any) => {

        const cloneState: any = { ...state };

        cloneState[uid] = mapFileItem(initProgressFile, 100);

        return { ...cloneState };
      });

      setReloadData(true);
    }).catch(e => {

    });
  }

  const mapFileItem = (item: any, percent: number) => {

    return {
      extension: item?.name?.split('.').pop(),
      ...item,
      percent: Number(percent)
    };
  };

  const triggerBrowserFile = () => {

    const uploadFile = document.getElementById(`upload-drag-file`);

    uploadFile?.click();
  };

  return (
    <div
      className={'simple-document-content'}
      onClick={triggerBrowserFile}
    >

      <input
        type='file'
        id={'upload-drag-file'}
        multiple={true}
        style={{ display: 'none' }}
        onChange={(e) => uploadMultipleFiles(e.target.files)}
        // onChange={(e) => uploadMultipleFiles(e.target.files).then(() => {})}
      />

      <div className={'upload-icon-wrapper'} style={secondBgColor}>
        <FiUploadCloud className={'upload-icon'} style={primaryTextColor} />
      </div>
      <div className={'upload-content-wrapper'}>
        <p className={'upload-title'}><span style={primaryTextColor}>Bấm vào đây</span> hoặc kéo thả tệp để tải lên
        </p>
        <p className={'upload-description'}>Các tệp tải lên có dung lượng không quá 2M</p>
      </div>
    </div>
  );
};

export default Index;