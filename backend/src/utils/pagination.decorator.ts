import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Pagination = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    if (!!request.query.page === false) {   //memberikan nilai default 1 jika tidak dikirim client
      request.query.page = 1;
    }
    if (!!request.query.page_size === false) { //memberikan nilai default 10 jika tidak dikirim client
      request.query.page_size = 10;
    }

    request.query.limit =
      (Number(request.query.page) - 1) * Number(request.query.page_size);
    request.query.page_size = Number(request.query.page_size);
    request.query.page = Number(request.query.page);
    return request.query;
  },
);