import axios from "axios";

export const instance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_SERVICE as string,
  timeout: 1000 * 60 * 3,
});

instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent

    config.headers["x-user-id"] = `Geodeva`;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export interface BaseResponse {
  status: number;
  message: string;
  
}

export interface BaseResponsePagination {
  status: number;
  message: string;
  meta: {
    page: number;
    limit: number;
    totalDocs: number;
    totalPages: number;
  };
}