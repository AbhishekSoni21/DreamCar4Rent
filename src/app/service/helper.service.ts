import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { ModelResponse } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  showLoader = new BehaviorSubject(false);

  getErrorMsg(error:HttpErrorResponse){

    let errorMessage=''
    if(error.error && error.error.error){
        var code=error.error.error.message.split(":")[0]
        switch (code.trim()) {
          case 'EMAIL_NOT_FOUND':
            errorMessage='There is no user record corresponding to this identifier. The user may have been deleted.'
            break;
          case 'INVALID_PASSWORD':
            errorMessage = 'The password is invalid or the user does not have a password.'
          break;
            case 'USER_DISABLED':
            errorMessage = 'The user account has been disabled by an administrator.'
          break;
            case 'INVALID_CUSTOM_TOKEN':
            errorMessage = 'The custom token format is incorrect or the token is invalid for some reason (e.g. expired, invalid signature etc.)'
          break;
            case 'CREDENTIAL_MISMATCH':
            errorMessage = 'The custom token corresponds to a different Firebase project.'
          break;
            case 'TOKEN_EXPIRED':
            errorMessage = 'The user\'s credential is no longer valid. The user must sign in again.'
          break;
            case 'USER_NOT_FOUND':
            errorMessage = 'The user corresponding to the refresh token was not found. It is likely the user was deleted.'
          break;
            case 'INVALID_REFRESH_TOKEN':
            errorMessage = 'An invalid refresh token is provided.'
          break;
            case  'INVALID_GRANT_TYPE':
            errorMessage = 'The grant type specified is invalid.'
          break;
            case 'MISSING_REFRESH_TOKEN':
            errorMessage = 'No refresh token provided.'
          break;
            case 'EMAIL_EXISTS':
            errorMessage = 'The email address is already in use by another account.'
          break;
            case 'OPERATION_NOT_ALLOWED':
            errorMessage = 'Password sign-in is disabled for this project.'
          break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
            errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.'
          break;
          default:
            errorMessage ='Something went wrong. Please try after sometime.'
          break;


          }
          var obj:ModelResponse ={
            title:'Error',
            message:errorMessage,
            status:'error'
          }
      }
      else{
        errorMessage = "'Something went wrong. Please try after sometime.'"
        var obj:ModelResponse ={
          title:'Network Error',
          message:errorMessage,
          status:'error'
        }
      }
      return throwError(obj)
  }

  setDataInLocalStorage(key:string,value:any):void{
    localStorage.setItem(key,JSON.stringify(value))
  }

  getDataFromLocalStorage(key:string):any{
    return JSON.parse(localStorage.getItem(key)!)
  }
}
