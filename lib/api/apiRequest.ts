import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import { api } from "./axios";
import { ApiError } from "./utils/apiError";

export const apiRequest = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const res: AxiosResponse<{ success: boolean; data: T }> = await api(config);

    return res.data.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      throw new ApiError(
        err.response?.data?.message || "Something went wrong",
        err.response?.status || 500,
        err.response?.data,
      );
    }

    throw new ApiError(
      err instanceof Error ? err.message : "Something went wrong",
      500,
    );
  }
};
