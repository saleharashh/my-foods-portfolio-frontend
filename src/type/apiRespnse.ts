export interface BaseResposne {
  message: string;
  isSuccess: boolean;
  statusCode: number;
}

export interface ApiResonse<T> extends BaseResposne {
  data: T;
}
