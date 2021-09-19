import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from './config';
import { SignUpInResponse } from './model/model';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  constructor(private httpClient:HttpClient) { }

  signUp(email:string,password:string){
   return this.httpClient.post<SignUpInResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${config.API_KEY}`,{email:email,password:password,returnSecureToken:true})
  }

  signIn(email:string,password:string){
    return this.httpClient.post<SignUpInResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${config.API_KEY}`,{email:email,password:password,returnSecureToken:true})
  }
}
