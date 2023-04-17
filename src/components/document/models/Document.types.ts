export interface DocumentProps {

  moduleId: string,
  appId: string,
  externalReferenceCode: string,
  readonly: boolean,
  primaryColor: string,
  baseURL: string,
  baseDomain: string
}

export interface UploadFileItemProps {

  key: string,
  data: FileProps
}

export interface FileProps {

  uid: string,
  id: number,
  name: string,
  size: number,
  extension: string,
  percent?: number,
  error?: any
}