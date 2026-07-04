export type GetAllApiResponse<T> = {
  success: boolean;
  data: T;
  count?: number;
};
