import axios, { AxiosProgressEvent } from 'axios';

const BASE_PATH = '/dogoo/files-manager-rest/v2.0/document-managers';
export const getDocumentsByPkCode = async (params: {}, otherConfig: any) => {

  const config = { ...otherConfig, params };

  const response = await axios.get(BASE_PATH, config);

  return response?.data || null;
};

export async function deleteDocumentById(id: number) {

  const response = await axios.delete(BASE_PATH + `/${id}`);

  return response?.data || [];
}

export async function uploadFile(data: FormData, onUploadProgress : any) {

  const response = await axios.post(
    BASE_PATH + "/file",
    data,
    {headers: {"Content-Type": "multipart/form-data"}, onUploadProgress})

  return response?.data || []
}