export interface SignUpInResponse{
  displayName?: string,
  email: string,
  expiresIn: string,
  idToken: string,
  kind?: string,
  localId: string,
  refreshToken: string,
  registered?: boolean,
}

export interface ModelResponse{
  title:string;
  message:string;
  status:string;
}

