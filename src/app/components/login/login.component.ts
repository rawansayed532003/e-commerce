import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule , RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy{

  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _AuthService = inject(AuthService)
  private readonly _Router = inject(Router)
  msgError:string = ''
  isLoading:boolean = false
  loginSub!:Subscription
  loginForm : FormGroup = this._FormBuilder.group({
    email : [null , [Validators.required]],
    password : [null , [Validators.required]]
  })
  loginSubmit(){
    if(this.loginForm.valid)
    {
      this.isLoading = true
      this.loginSub = this._AuthService.setLoginForm(this.loginForm.value).subscribe({
        next:(res)=>{
            localStorage.setItem('userToken' , res.token)

            this._AuthService.saveUserData()
            console.log(res.message)

            this._Router.navigate(['/home'])
          
          this.isLoading = false
          this.msgError = res.message
        },
        error:(err:HttpErrorResponse)=>{
          if(err.error.message == "fail")
            this.msgError = err.error.errors.msg
          else
            this.msgError = err.error.message
          
            this.isLoading = false
        }
      })
    }
  }
  ngOnDestroy(): void {
      this.loginSub?.unsubscribe()
  }
}
