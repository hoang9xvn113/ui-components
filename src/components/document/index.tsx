import React, { createContext, useContext, useState } from 'react';
import { DocumentProps } from './models/Document.types';
import UploadFile from './components/upload-file';
import ListUploadFile from './components/list-upload-file';
import { useDocuments } from './hooks/useDocuments';
import { setupAxios } from './setup/axios/Intercepter';
import './document.css';

export const DocumentContext = createContext({});
export const useDocumentContext: any = () => useContext(DocumentContext);

const Index: React.FC<DocumentProps> = properties => {

  const {
    externalReferenceCode,
    moduleId,
    appId,
    readonly,
    primaryColor,
    baseURL,
    baseDomain
  } = properties;

  setupAxios(baseURL, baseDomain);

  const [listProgressFiles, setListProgressFiles] = useState<any>({});

  const [reloadData, setReloadData] = useState(false);

  const onAfterSuccess = () => {

    const cloneListProgressFiles: any = {};

    Object.keys(listProgressFiles)?.forEach(key => {

      if (listProgressFiles[key].percent !== 100) {
        cloneListProgressFiles[key] = listProgressFiles[key];
      }
    });

    console.log("tree", cloneListProgressFiles);
    setListProgressFiles(cloneListProgressFiles);

    setReloadData(false);
  };

  const onAfterError = () => {

  };

  const [dataSource] = useDocuments(
    { type: 'file', pkCode: externalReferenceCode, appId, moduleId },
    [reloadData],
    baseDomain,
    onAfterSuccess,
    onAfterError
  );

  const renderNewDataSource = () => {

    const newDataSource: any = {};

    dataSource?.forEach((item: any) => {

      newDataSource[item.externalReferenceCode] = item;
    });

    return newDataSource;
  };

  const value = {
    primaryColor,
    externalReferenceCode,
    moduleId,
    appId,
    readonly,
    baseURL,
    dataSource,
    newDataSource: renderNewDataSource(),
    listProgressFiles,
    setListProgressFiles,
    setReloadData
  };

  return (
    <DocumentContext.Provider
      value={value}
    >
      <div className={'simple-document-wrapper'}>
        <UploadFile />
        <ListUploadFile />
      </div>
    </DocumentContext.Provider>
  );
};

export default Index;
