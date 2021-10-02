import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { config } from '../config';
import { SignUpInResponse } from '../model/model';
import { User, UserDetail, UserResponse } from '../model/user.model';
import { EncryptDecryptService } from './encrypt-decrypt.service';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  constructor(private httpClient:HttpClient,private helperService:HelperService,private router:Router,private encryptDecrypt:EncryptDecryptService) { }

  user = new BehaviorSubject<User|null>(null);

  getuserDetail =new Observable<any>();

  userDetails = new BehaviorSubject(<UserDetail|null>{})

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
    this.userDetails.next({} as UserDetail)
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
      this.setUserUID(loggedInUser.localId)
      const expiresIn=new Date(user['_tokenExpirationDate']).getTime() - new Date().getTime();
      console.log("User will be auto sign out in ",expiresIn , " seconds");

      this.autoSignOut(expiresIn)
      let uid = this.user.value?.localId;
      this.getUserData(uid!).subscribe((res) => {
        if (!!res) {
          let decryptResponse = this.encryptDecrypt.decryptData(res.data);
           this.userDetails.next(decryptResponse)
        }
        else{
          this.router.navigate(['user'])
        }
      },err=>{
  console.log("error",err);

      });
    }else{
      this.router.navigate([''])
    }
  }


  getCarList():Observable<any>{
    return this.httpClient.get(config.APP_Endpoint+'carData.json')
  }

  updateUserData(uid:string,payload:{}){
    return this.httpClient.patch(config.APP_Endpoint+'usersProfile/'+uid+'.json',payload)
  }

  getUserData(uid:string):Observable<any>{
    return this.httpClient.get(config.APP_Endpoint+'usersProfile/'+uid+'.json')
  }

  setUserUID(uid:string){
    this.getuserDetail = this.httpClient.get(config.APP_Endpoint+'usersProfile/'+uid+'.json')
  }

}
