import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { AppServiceService } from 'src/app/service/app-service.service';
import { EncryptDecryptService } from 'src/app/service/encrypt-decrypt.service';
import { HelperService } from 'src/app/service/helper.service';
@Component({
  selector: 'app-view-edit-profile',
  templateUrl: './view-edit-profile.component.html',
  styleUrls: ['./view-edit-profile.component.scss'],
})
export class ViewEditProfileComponent implements OnInit {
  constructor(
    private storage: AngularFireStorage,
    private appService: AppServiceService,
    private encryptDecrypt: EncryptDecryptService,
    private helperFunction:HelperService
  ) {}
  uploadPercent!: Observable<number | any>;
  downloadURL!: Observable<string>;
  errorMessage = '';
  showprogress = false;
  currentDate = new Date().toLocaleDateString();
  userForm = new FormGroup({});
  imageUploading!:boolean;

  ngOnInit(): void {
    this.helperFunction.showLoader.next(true);
    this.userForm = new FormGroup({
      displayName: new FormControl('', [Validators.required]),
      contactnumber: new FormControl('', [
        Validators.required,
        Validators.pattern('^[1-9]{1}[0-9]{9}'),
      ]),
      dob: new FormControl('', [Validators.required]),
      photoUrl: new FormControl(''),
    });
    this.getUserData();
  }

  getUserData(){
    let uid = this.appService.user.value?.localId;
    this.appService.getUserData(uid!).subscribe((res) => {
      if (!!res) {
        let decryptResponse = this.encryptDecrypt.decryptData(res.data);
        this.appService.userDetails.next(decryptResponse)
        this.userForm = new FormGroup({
          displayName: new FormControl(decryptResponse.displayName, [
            Validators.required,
          ]),
          contactnumber: new FormControl(decryptResponse.contactnumber, [
            Validators.required,
            Validators.pattern('^[1-9]{1}[0-9]{9}'),
          ]),
          dob: new FormControl(decryptResponse.dob, [Validators.required]),
          photoUrl: new FormControl(''),
        });

      }
      this.helperFunction.showLoader.next(false);
    },err=>{
      this.helperFunction.showLoader.next(false);
    });
  }

  uploadFile(event: any) {
    this.imageUploading=true;
    const file = event.target.files[0];
    this.errorMessage = '';
    this.userForm.get('photoUrl')?.updateValueAndValidity();
    if (file.size > 2 * 1048576) {
      let size = file.size / 1024 / 1024;
      this.errorMessage = `Your file size i.e ${size.toFixed(
        2
      )}MB which exceeds the uploaded limit.`;
      this.userForm.get('photoUrl')?.setErrors({ valid: false });
    } else {
      this.showprogress = true;
      let uid = this.appService.user.value?.localId;
      const filePath =  uid!;
      const fileRef = this.storage.ref(filePath+"/"+new Date().getTime());
      const task = this.storage.upload(filePath+"/"+new Date().getTime(), file);

      // observe percentage changes
      this.uploadPercent = task.percentageChanges();
      // get notified when the download URL is available
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((res) => {
              this.downloadURL = res;

            });
            this.showprogress = false;
            this.imageUploading=false;
          })
        )
        .subscribe();
    }
  }

  getControl(value: string): boolean | undefined {
    return (
      this.userForm.get(value)?.touched && !this.userForm.get(value)?.valid
    );
  }

  onDateChange(e: any) {
    let optedDate = new Date(e.target.value).getTime();
    let currentDate = new Date().getTime();

    if (optedDate > currentDate) {
      this.userForm.get('dob')?.setErrors({ valid: false });
    } else {
      this.userForm.get('dob')?.updateValueAndValidity();
    }
  }

  onSubmit() {
    this.helperFunction.showLoader.next(true);
    let uid = this.appService.user.value?.localId;
    this.userForm.value['photoUrl'] = this.downloadURL?this.downloadURL:this.appService.userDetails.value?.photoUrl;
    let payload = this.encryptDecrypt.encryptData(this.userForm.value);

    this.appService.updateUserData(uid!, { data: payload }).subscribe((res) => {
      this.helperFunction.showLoader.next(false);
      this.getUserData();
    },err=>{
      this.helperFunction.showLoader.next(false);
    });
  }
}
