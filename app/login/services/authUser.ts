import {
  ModifyUserPayload,
  User,
  UserCredentials,
  UserSession,
} from "@globals";
import { getAuth } from "@lib/api/getAuth";
import { api } from "@lib/api/axios";
import { apiRequest } from "@lib/api/apiRequest";

// export const signUpUser = (data) =>
//   apiRequest({
//     method: "POST",
//     url: "/auth/sign-up",
//     data,
//   });

const getCurrentUserId = () => {
  const { user } = getAuth();

  if (!user?._id) throw new Error("No authenticated user found.");

  return user._id;
};

export const loginUser = (data: UserCredentials) =>
  apiRequest<{
    accessToken: string;
    refreshToken: string;
    user: User;
  }>({
    method: "POST",
    url: "/auth/sign-in",
    data,
  });

export const getSessions = async () => {
  const res = await api.get<{ sessions: UserSession[] }>("/auth/sessions");

  return res.data.sessions;
};

export const getCurrentUser = () =>
  apiRequest<User>({
    method: "GET",
    url: `/users/${getCurrentUserId()}`,
  });

export const refreshToken = (data: { refreshToken: string }) =>
  apiRequest<{
    accessToken: string;
    refreshToken: string;
  }>({
    method: "POST",
    url: "/auth/refresh-token",
    data,
  });

export const logOutUser = () =>
  apiRequest({
    method: "POST",
    url: "/auth/sign-out",
  });

export const logoutAll = () =>
  apiRequest({
    method: "POST",
    url: "/auth/sign-out-all",
  });

export const modifyUser = (data: ModifyUserPayload) =>
  apiRequest<User>({
    method: "PUT",
    url: `/users/${getCurrentUserId()}`,
    data,
  });

// export const deleteUser = (data) =>
//   apiRequest({
//     method: "DELETE",
//     url: `/users/${getAuth().user.id}`,
//     data,
//   });
