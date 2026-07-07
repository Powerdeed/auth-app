export type KeycloakTokenResponse = {
  access_token: string;
  refresh_token?: string;
  id_token?: string;
  expires_in: number;
  refresh_expires_in?: number;
  token_type: string;
  scope?: string;
};

export type KeycloakTokenClaims = {
  sub?: string;
  name?: string;
  preferred_username?: string;
  email?: string;
  realm_access?: {
    roles?: string[];
  };
};
