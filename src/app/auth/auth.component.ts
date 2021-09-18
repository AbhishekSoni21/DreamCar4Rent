import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, MinLengthValidator, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  loginMode=true;
  form!:FormGroup;
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.form =this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]]

    })
  }

  public onModeChange():void{
    this.loginMode=!this.loginMode
  }

  getControl(value:string):boolean|undefined{
    return  this.form.get(value)?.touched && !this.form.get(value)?.valid
  }

  onSubmit():void{
    if(this.form.valid){
      console.log("value",this.form.value)

    }
  }

}
