export interface CredentialsViewModel {
  emailAddress: string;
  password: string;
}

export interface MicrosoftOptions {
  client_id: string;
  scope: string;
}

export interface MicrosoftAuthViewModel {
  accessToken: string;
  state: string;
  baseHref: string;
}

export interface UserSummary {
  id: string;
  jwtToken: string;
  name: string;
  emailAddress: string;
  roles: string[];
}

export function anonymousUser(): UserSummary {
  return {
      id: '',
      jwtToken: '',
      name: 'Anonymous',
      emailAddress: '',
      roles: []
  };
}
