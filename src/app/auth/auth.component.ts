import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { AppServiceService } from '../service/app-service.service';
import * as bootstrap from 'bootstrap';
import { ModelResponse } from '../model/model';
import { HelperService } from '../service/helper.service';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  loginMode=true;
  form!:FormGroup;
  dataObj:ModelResponse={} as ModelResponse;
  constructor(private fb:FormBuilder,private appService:AppServiceService,private helperFunction:HelperService,private router:Router) { }
  ngOnInit(): void {
    this.form =this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]]

    })
  }

  public onModeChange():void{
    this.loginMode=!this.loginMode;
    this.form.get('email')?.setValue('');
    this.form.get('password')?.setValue('');
    this.form.reset();
  }

  getControl(value:string):boolean|undefined{
    return  this.form.get(value)?.touched && !this.form.get(value)?.valid
  }

  onSubmit():void{
    if(this.form.valid){
      const {email,password}=this.form.value;
      if(this.loginMode){
        this.helperFunction.showLoader.next(true);
        this.appService.signIn(email,password).pipe(catchError(err=>this.helperFunction.getErrorMsg(err)),tap(res=>this.appService.autheticateUser(res))).subscribe(res=>{
          // var myModal = new bootstrap.Modal(document.getElementById('popupModal')!)
          // myModal.show()
          // this.dataObj.message="sign in successful";
          // this.dataObj.status="success";
          // this.dataObj.title="Success";
          this.appService.setUserUID(res.localId);
          this.router.navigate(['dashboard'])



          this.helperFunction.showLoader.next(false);
        },err=>{
          var myModal = new bootstrap.Modal(document.getElementById('popupModal')!)
          myModal.show()
          this.dataObj=err;
          this.helperFunction.showLoader.next(false);

        })
      }else{
        this.helperFunction.showLoader.next(true);
        this.appService.signUp(email,password).pipe(catchError(err=>this.helperFunction.getErrorMsg(err)),tap(res=>this.appService.autheticateUser(res))).subscribe(res=>{
          var myModal = new bootstrap.Modal(document.getElementById('popupModal')!)
          myModal.show();
          this.dataObj={
            title:'Success',
            message:'Account create successfully.',
            status:'success'
          };
          this.helperFunction.showLoader.next(false);

        },err=>{
          var myModal = new bootstrap.Modal(document.getElementById('popupModal')!)
          myModal.show()
          this.dataObj=err;
          this.helperFunction.showLoader.next(false);

        })
      }

    }
  }

}
