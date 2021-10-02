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

export interface Car{
  brand:string;
  color:string;
  fuelType:string;
  model:string;
  rentPrice:string;
  seats:string;
  year:string;
  photoUrl:string;
}
