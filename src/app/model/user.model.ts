export class User{
  constructor(public name:string ,public email:string,public idToken:string,public localId:string,public _token:string,public _tokenExpirationDate:Date,public registered:boolean){

  }

  get token(){
    if( new Date().getTime() > new Date(this._tokenExpirationDate).getTime()){
      return null;
    }
    return this._token;
  }
}

export interface UserResponse{
  email:string;
  userId:string;
  token:string;
  expiresIn:string;
}
