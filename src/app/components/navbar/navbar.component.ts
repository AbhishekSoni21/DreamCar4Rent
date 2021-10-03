import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { UserDetail } from 'src/app/model/user.model';
import { AppServiceService } from 'src/app/service/app-service.service';
import { EncryptDecryptService } from 'src/app/service/encrypt-decrypt.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  loggedIn=false;
  user={} as UserDetail|null;
  adminList=[];
  isAdmin=false;
  constructor(private appService:AppServiceService,private encryptDecryptService:EncryptDecryptService) {  }

  ngOnInit(): void {
    this.appService.user.subscribe(res=>{
      if(res){
        this.loggedIn=true
      }else{
        this.loggedIn=false
      }
    })

    this.appService.userDetails.subscribe(res=>{
      this.user=res?.displayName===undefined?null:res;
    }
    )

    this.appService.getAdminList().pipe(map(res=>this.encryptDecryptService.decryptData(res))).subscribe(response=>{
      console.log("admin",response);
      this.adminList=response.data;
      this.adminList.map(data=>{if(data===this.appService.user.value?.localId){
        this.appService.isAdmin.next(true)
        this.isAdmin=true;
      }
      else{
        this.appService.isAdmin.next(false)
        this.isAdmin=false;
      }})

    })
  }

  handleSignOut(){
    console.log("sign out clicked");

    this.appService.signOut();
  }

}
