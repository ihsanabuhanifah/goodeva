import { type ChangeEvent, useEffect, useState } from "react";

interface PaginationParams {
  page: number;
  page_size: number;
  [key: string]: any;
}

export const usePagination = <T extends PaginationParams>(defaultParams: T) => {
  const [params, setParams] = useState<T>(defaultParams);

  const [filterParams, setFilterParams] = useState<T>(defaultParams);

  const [search, setSearch] = useState((defaultParams.search as string) || "");

  useEffect(() => {
    
    const interval = setTimeout(() => {
      const newParams = { ...params, search: search, page: "1" } as T;

      setParams(newParams);
      setFilterParams(newParams);
    }, 500);

    return () => clearTimeout(interval);
  }, [search]);

  const handleSearch = (e: ChangeEvent<any>) => {
    setSearch(e.target.value);
  };

  const handleFilter = () => {
    const newParams = { ...params, page: "1" } as T;
    setFilterParams(newParams);
    setParams(newParams);
  };

  const handleClear = () => {
    setFilterParams(defaultParams);
    setParams(defaultParams);
    setSearch((defaultParams.search as string) || "");
  };

  const handlePageSize = (e: ChangeEvent<any>) => {
    const newSize = e.target.value;
    const newParams = { ...params, page_size: newSize, page: "1" } as T;

    setParams(newParams);
    setFilterParams(newParams);
  };

  const handlePage = (page: number) => {
    const newPage = String(page);
    const newParams = { ...params, page: newPage } as T;

    setParams(newParams);
    setFilterParams(newParams);
  };

  return {
    params,
    setParams,
    handleFilter,
    handleClear,
    handlePageSize,
    handlePage,
    filterParams,
    handleSearch,
    search,
  };
};
