import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { config } from '../config';
import { SignUpInResponse } from '../model/model';
import { User, UserResponse } from '../model/user.model';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  constructor(private httpClient:HttpClient,private helperService:HelperService,private router:Router) { }

  user = new BehaviorSubject<User|null>(null);

  signUp(email:string,password:string){
   return this.httpClient.post<SignUpInResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${config.API_KEY}`,{email:email,password:password,returnSecureToken:true})
  }

  signIn(email:string,password:string){
    return this.httpClient.post<SignUpInResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${config.API_KEY}`,{email:email,password:password,returnSecureToken:true})
  }

  signOut(){
    this.user.next(null);
    this.helperService.clearLocalStorage('userData');
    clearTimeout();
    this.router.navigate(['']);
  }

  autoSignOut(expirationDuration:number){
    setTimeout(()=>{
      this.signOut()
    },expirationDuration)
  }

  autheticateUser(value:SignUpInResponse):void{
    const {displayName="",email,idToken,localId,refreshToken,expiresIn,registered=false}=value;
    const expirationDate = new Date(new Date().getTime()+(parseInt(expiresIn)*1000));
    const user = new User(displayName,email,idToken,localId,refreshToken,new Date(expirationDate),registered)
    this.user.next(user);
    console.log("user data",user);
    this.helperService.setDataInLocalStorage("userData",user)
    this.autoSignOut(parseInt(expiresIn)*1000);
    console.log("User will be auto sign out in ",parseInt(expiresIn)*1000 ,"seconds");


  }


  retainLogin(){
    const user:User = this.helperService.getDataFromLocalStorage("userData");
    if(!user){
      return
    }

    const loggedInUser = new User(user.name,user.email,user.idToken,user.localId, user._token,user._tokenExpirationDate,user.registered)

    if(loggedInUser.token){
      this.user.next(loggedInUser);
      const expiresIn=new Date(user['_tokenExpirationDate']).getTime() - new Date().getTime();
      console.log("User will be auto sign out in ",expiresIn , " seconds");

      this.autoSignOut(expiresIn)
    }else{
      this.router.navigate([''])
    }
  }


  getCarList():Observable<any>{
    return this.httpClient.get(config.APP_Endpoint+'allcarlist.json')
  }
}
