import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export function useGetEtablissements() {
    const { data, error, isLoading } = useSWR(endpoints.admins.etablissements.all, fetcher, swrOptions);

    const memoizedValue = useMemo(
        () => ({
            etablissements : data?.data,
            isLoading,
            error,
        }),
        [data, isLoading, error]
    )
    
    return memoizedValue;
}