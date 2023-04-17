import React from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { BsCheckCircleFill } from 'react-icons/bs';
import { Modal, Progress } from 'antd';
import { useDocumentContext } from '../../index';
import { FileProps, UploadFileItemProps } from '../../models/Document.types';
import { deleteDocumentById } from '../../api/Document.api';
import styled from 'styled-components';

const Index = () => {

  const { newDataSource, listProgressFiles } = useDocumentContext();

  const renderUploadFileItem = (key: string, data: FileProps) => {

    if (!!data.error) {

      return <ErrorUploadFileItem key={key} data={data} />;
    } else {

      if (data.percent === 100) {

        return <SuccessUploadFileItem key={key} data={data} />;
      } else {

        return <ProgressUploadFileItem key={key} data={data} />;
      }
    }
  };

  return (
    <div className={'list-upload-file'}>

      {Object.keys(listProgressFiles)?.map(key => {

        return renderUploadFileItem(key, listProgressFiles[key]);
      })}

      {Object.keys(newDataSource)?.map(key => {

        return <UploadFileItem key={key} data={newDataSource[key]} />;
      })}

    </div>
  );
};

export default Index;

const UploadFileItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px
`;

const UploadFileItemTitle = styled.div`
  width: 400px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis
`;

const UploadFileItem: React.FC<UploadFileItemProps> = (properties) => {

  const { setReloadData } = useDocumentContext();

  const { data } = properties;

  function onDelete() {
    Modal.confirm({
      onOk: () => {
        return deleteDocumentById(data.id).then(() => {
          setReloadData(true);
        });
      },
      onCancel: () => {

      }
    });
  }

  return (
    <div className={'upload-file-item'}>
      <UploadFileItemWrapper style={{ marginBottom: 4 }}>
        <UploadFileItemTitle>
          {data?.name}
        </UploadFileItemTitle>

        <div className={'upload-file-item__icon'} onClick={onDelete}>
          <FiTrash2 />
        </div>
      </UploadFileItemWrapper>

      <UploadFileItemWrapper>
        <div style={{ width: 400 }}>

        </div>
        <div className={'upload-file-item__percent'}>
        </div>
      </UploadFileItemWrapper>

    </div>
  );
};

const SuccessUploadFileItem: React.FC<UploadFileItemProps> = (props) => {

  const { data } = props;

  const { primaryColor } = useDocumentContext();

  const primaryTextColor = {
    color: primaryColor
  };

  const primaryBorderColor = {
    borderColor: primaryColor
  };

  return (
    <div className={'upload-file-item'} style={primaryBorderColor}>
      <UploadFileItemWrapper style={{ marginBottom: 4 }}>
        <UploadFileItemTitle>
          {data.name}

        </UploadFileItemTitle>

        <div className={'upload-file-item__icon'}>
          <BsCheckCircleFill style={primaryTextColor} />
        </div>
      </UploadFileItemWrapper>

      <UploadFileItemWrapper>
        <div style={{ width: 400 }}>
          <Progress showInfo={false} percent={100} strokeColor={primaryColor} style={{ marginBottom: 0 }} />
        </div>
        <div className={'upload-file-item__percent'}>
          100%
        </div>
      </UploadFileItemWrapper>
    </div>
  );
};

export const ProgressUploadFileItem: React.FC<UploadFileItemProps> = (props) => {

  const { data } = props;

  const { primaryColor } = useDocumentContext();

  return (
    <div className={'upload-file-item'}>
      <UploadFileItemWrapper style={{ marginBottom: 4 }}>
        <UploadFileItemTitle>
          {data.name}
        </UploadFileItemTitle>


        <div className={'upload-file-item__icon'}>
          <FiTrash2 />
        </div>
      </UploadFileItemWrapper>

      <UploadFileItemWrapper>
        <div style={{ width: 400 }}>
          <Progress showInfo={false} percent={data.percent} strokeColor={primaryColor} style={{ marginBottom: 0 }} />
        </div>
        <div className={'upload-file-item__percent'}>
          {data.percent}%
        </div>
      </UploadFileItemWrapper>
      {/*</div>*/}
    </div>
  );
};

const ErrorUploadFileItem: React.FC<UploadFileItemProps> = (props) => {

  const { data } = props;

  return (
    <div className={'upload-file-item--error'}>
      <UploadFileItemWrapper style={{ marginBottom: 4 }}>
        <UploadFileItemTitle>
          {data.name}
        </UploadFileItemTitle>

        <div className={'upload-file-item__icon'}>
          <FiTrash2 />
        </div>
      </UploadFileItemWrapper>

      <UploadFileItemWrapper>
        <div style={{ width: 400 }}>
          Tải lên lỗi, <span style={{ fontWeight: 550 }}>bấm vào đây</span> để thử lại!
        </div>
        <div className={'upload-file-item__percent'}>
        </div>
      </UploadFileItemWrapper>
      {/*</div>*/}
    </div>
  );
};