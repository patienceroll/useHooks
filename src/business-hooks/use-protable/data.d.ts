export interface BaseResponse<T = null> {
  code: string;
  data: T;
  message: string;
}

export type BaseListParams = {
  current: number;
  pageSize: number;
};

export interface List<T, Additional = undefined> {
  current: number;
  pageSize: number;
  total: number;
  data: T[];
  additional: Additional;
}
