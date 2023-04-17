import { useEffect, useRef, useState } from 'react';
import { getDocumentsByPkCode } from '../api/Document.api';
import { refreshAccessToken } from '../utils/AxiosCustom';

export const useDocuments = (params: object, dependencies: any, baseDomain: string, afterSuccess?: any, afterError?: any) => {

  const [dataSource, setDataSource] = useState<[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

  const loadDebounce = useRef<any>(null);
  const fetchData = () => {

    clearTimeout(loadDebounce.current);

    loadDebounce.current = setTimeout(() => {

      refreshAccessToken(baseDomain).then(r => {
      });

      getDocumentsByPkCode(params, {}).then(r => {
        setDataSource(r?.items);
        setTotalCount(r?.totalCount);

        !!afterSuccess && afterSuccess()
      }).catch((e) => {
        setError(e);

        !!afterError && afterError()
      });
    }, 200);
  };

  useEffect(() => {
    fetchData();
  }, dependencies);

  return [dataSource, totalCount, loading, error] as const;
};