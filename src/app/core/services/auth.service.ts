import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _HttpClient = inject(HttpClient);
  private readonly _Router = inject(Router);

  userData:any = null
  idUser!:string

  setRegisterForm(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signup` , data)
  }

  setLoginForm(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signin` , data)
  }

  saveUserData():string{
    if(localStorage.getItem('userToken') !== null)
    {
      this.userData = jwtDecode(localStorage.getItem('userToken')!)
      return this.userData.id
    }
    return ''
  }

  signOut():void{
    this.userData = null;
    localStorage.removeItem('userToken');
    this._Router.navigate(['/login'])
  }

  validEmail(data:string):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords` , data)
  }
  validCode(data:string):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode` , data)
  }
  newPassword(data:string):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword` , data)
  }
}
