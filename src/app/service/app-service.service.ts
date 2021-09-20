import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { config } from '../config';
import { SignUpInResponse } from '../model/model';
import { User, UserResponse } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  constructor(private httpClient:HttpClient) { }

  user = new BehaviorSubject<User|null>(null);

  signUp(email:string,password:string){
   return this.httpClient.post<SignUpInResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${config.API_KEY}`,{email:email,password:password,returnSecureToken:true})
  }

  signIn(email:string,password:string){
    return this.httpClient.post<SignUpInResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${config.API_KEY}`,{email:email,password:password,returnSecureToken:true})
  }

  autheticateUser(value:SignUpInResponse):void{
    const {displayName,email,idToken,refreshToken,expiresIn}=value;
    const expirationDate = new Date().getTime()+parseInt(expiresIn);
    const user = new User(displayName,email,idToken,refreshToken,new Date(expirationDate))
    this.user.next(user);
    console.log("user data",user);
  }

  getCarList():Observable<any>{
    return this.httpClient.get(config.APP_Endpoint+'carList.json')
  }
}
