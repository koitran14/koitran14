export interface IAppResponse<T> {
  isSuccess: boolean;
  message?: string;
  data?: T;
}
