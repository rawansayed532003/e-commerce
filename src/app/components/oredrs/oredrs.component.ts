import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';

@Component({
  selector: 'app-oredrs',
  standalone: true,
  imports: [ReactiveFormsModule , ],
  templateUrl: './oredrs.component.html',
  styleUrl: './oredrs.component.scss'
})
export class OredrsComponent implements OnInit{
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _OrdersService = inject(OrdersService)
  isLoading:boolean = false
  carId:string|null = ""


  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next:(p)=>
        {
           this.carId = p.get('id')
        }
          
      })
  }

  orderForm:FormGroup = this._FormBuilder.group({
    details:[null , [Validators.required , Validators.minLength(3)]],
    phone:[null ,  [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]],
    city:[null , [Validators.required]]
  })
  
  payment():void{
    this.isLoading=true
    if(this.orderForm.valid){
      this._OrdersService.checkOut(this.carId  , this.orderForm.value).subscribe({
        next:(res)=>{
          console.log(res)
          this.isLoading=false
          if(res.status == "success")
          {
            window.open(res.session.url , '_self')
          }
        },
        error:(err)=>
          console.log(err)
          
          
      })
    
    }
  }
}
