export class User{
  constructor(public name="" ,public email:string,public idToken:string,private _token:string,private _tokenExpirationDate:Date){

  }

  get token(){
    if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
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