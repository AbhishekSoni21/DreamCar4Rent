export interface SignUpInResponse{
  idToken	:string,
  email	:string,
  refreshToken:	string,
  expiresIn	:string,
  localId :string,
  registered?:boolean
}

export interface ModelResponse{
  title:string;
  message:string;
  status:string;
}
