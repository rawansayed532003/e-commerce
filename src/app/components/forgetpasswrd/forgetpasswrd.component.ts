import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpasswrd',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpasswrd.component.html',
  styleUrl: './forgetpasswrd.component.scss'
})
export class ForgetpasswrdComponent implements OnDestroy {


  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _AuthService = inject(AuthService)
  private readonly _Router = inject(Router)

  resetSub!:Subscription;
  step:number = 1
  btnLoaded:boolean = false
  errorMsg:string|null = null

  emailForm:FormGroup = this._FormBuilder.group({
    email:[null , [Validators.required , Validators.email]]
  })

  codeForm:FormGroup = this._FormBuilder.group({
    resetCode:[null , [Validators.required , Validators.pattern(/^\w{4,}$/)]]
  })

  newPassForm:FormGroup = this._FormBuilder.group({
    email:[null , [Validators.required , Validators.email]],
    newPassword:[null , [Validators.required , Validators.pattern(/^\w{6,}$/)]]
  })

  VerifyEmailRest(){
    this.btnLoaded = true
    this.resetSub = this._AuthService.validEmail(this.emailForm.value).subscribe({
      next:(res)=>{
        console.log(res)
        if(res.statusMsg === 'success')
          this.step = 2;
        this.btnLoaded = false
      },
      error:(err)=>{
        console.log(err)
        this.btnLoaded = false
        this.errorMsg = err.error.message
        this.emailForm.get('email')?.patchValue(null)
      }
    })
    this.newPassForm.get('email')?.patchValue(this.emailForm.value.email)
  }

  VerifyCodeRest(){
    this.btnLoaded = true
    this.resetSub = this._AuthService.validCode(this.codeForm.value).subscribe({
      next:(res)=>{
        console.log(res)
        if(res.status === 'Success')
          this.step = 3;
        this.btnLoaded = false
      },
      error:(err)=>{
        console.log(err)
        this.btnLoaded = false
        this.errorMsg = err.error.message
        console.log(this.errorMsg)
        this.codeForm.get('resetCode')?.patchValue(null)
      }
    })
  }
  rePassword(){
    this.btnLoaded = true
    this.resetSub = this._AuthService.newPassword(this.newPassForm.value).subscribe({
      next:(res)=>{
        console.log(res)
        localStorage.setItem('userToken' , res.token)
        this._AuthService.saveUserData()
        this._Router.navigate(['/home'])
        this.btnLoaded = false
      },
      error:(err)=>{
        console.log(err)
        this.btnLoaded = false
      }
    })
  }
  ngOnDestroy(): void {
      this.resetSub.unsubscribe()
  }
}
