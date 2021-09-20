import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root',
})
export class EncryptDecryptService {
  constructor() {}

  encryptData(data: any): string {
    const encryptedData = encodeURIComponent(
      CryptoJS.AES.encrypt(
        JSON.stringify(data),
        'DevilNeverDies$403'
      ).toString()
    );
    console.log('Encrypted Data', encryptedData);

    return encryptedData;
  }

  decryptData(data: any) {
    var deData = CryptoJS.AES.decrypt(
      decodeURIComponent(data),
      'DevilNeverDies$403'
    );
    const decryptedData = JSON.parse(deData.toString(CryptoJS.enc.Utf8));
    console.log('Decrypted Data', decryptedData);

    return decryptedData;
  }
}
