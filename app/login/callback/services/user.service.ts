import { User } from "@globals";
import { apiRequest } from "@lib";
import { KEYCLOAK_CLIENT_ID } from "@env";
import { getKeycloakRedirectUri } from "@lib/keycloak/getRedirectUri";

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
      redirectUri: getKeycloakRedirectUri(),
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
