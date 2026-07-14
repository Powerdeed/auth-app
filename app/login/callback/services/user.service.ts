import { User } from "@globals";
import { apiRequest } from "@lib";
import { KEYCLOAK_CLIENT_ID, KEYCLOAK_REDIRECT_URI } from "@env";

const getRedirectUri = () =>
  KEYCLOAK_REDIRECT_URI || `${window.location.origin}/login/callback`;

export const createIdentitySession = async (
  code: string,
  codeVerifier: string,
): Promise<User> => {
  const response = await apiRequest<{
    user: User;
    expiresAt: string;
  }>({
    method: "POST",
    url: "/auth/session/keycloak",
    data: {
      code,
      codeVerifier,
      redirectUri: getRedirectUri(),
      clientId: KEYCLOAK_CLIENT_ID,
    },
  });

  return response.user;
};

export const getUserData = async (
  userId: string,
  access_token: string,
): Promise<User> =>
  await apiRequest({
    method: "GET",
    url: `/user/${userId}`,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
