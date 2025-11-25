import useSWR, { mutate } from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints, poster } from 'src/utils/axios';

const swrOptions = {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
};

export function useGetCategories() {
    const { data, error, isLoading } = useSWR(endpoints.admins.categories.all, fetcher, swrOptions);

    const memoizedValue = useMemo(
        () => ({
            categories: data?.data,
            isLoading,
            error,
        }),
        [data, isLoading, error]
    )

    return memoizedValue;
}

export async function createCategory(data) {
  const url = endpoints.admins.categories.all;
  return poster(url, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(() => {
    mutate(endpoints.admins.categories.all); // This will refetch the categories list
  });
}