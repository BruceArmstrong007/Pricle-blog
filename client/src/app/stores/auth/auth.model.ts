export interface AuthState {
  accessToken: string | null;
}

export interface AccessToken {
  accessToken: string;
}


export interface Register {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface Login {
  username: string;
  password: string;
}

export interface VerifyEmailLink {
  email: string;
}

export interface VerifyEmail {
  email: string;
  token: string;
}

export interface ResetPasswordLink {
  email: string;
}

export interface ResetPassword {
  email: string;
  password: string;
  confirmPassword: string;
  token: string;
}
