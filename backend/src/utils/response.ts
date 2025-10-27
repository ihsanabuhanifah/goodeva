export interface ResponseSuccess {
  message?: string;
  status: string;
  data?: [] | {};
}

export interface ResponsePagination {
  status: string;
  msg: string;
  data?: [] | {};
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
}

class BaseResponse {
  _success(message?: string, data?: any): ResponseSuccess {
    return {
      status: 'Success',
      message: message,
      data: data || {},
    };
  }

  _pagination(
    msg: string,
    data: any,
    totalData: number,
    page: number,
    limit: number,
  ): ResponsePagination {
    return {
      status: 'Success',
      msg: msg,
      data: data,
      pagination: {
        total: totalData,
        page: page,
        limit: limit,
      },
    };
  }
}

export default BaseResponse;
