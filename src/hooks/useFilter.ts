import { useMemo } from 'react';

export function useFilter<T extends { status: string }>(
  data: T[], 
  searchTerm: string, 
  searchKey: keyof T,
  showActiveOnly: boolean // New parameter
) {
  return useMemo(() => {
    return data.filter((item) => {
      // 1. Search Logic
      const matchesSearch = String(item[searchKey])
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      // 2. Status Logic
      const matchesStatus = showActiveOnly ? item.status === 'Active' : true;

      return matchesSearch && matchesStatus;
    });
  }, [data, searchTerm, searchKey, showActiveOnly]); // Add to dependency array
}