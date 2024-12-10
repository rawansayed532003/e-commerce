import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';
import { AuthService } from '../../core/services/auth.service';
import { Iorders } from '../../core/interfaces/iorders';

@Component({
  selector: 'app-alloredrs',
  standalone: true,
  imports: [],
  templateUrl: './alloredrs.component.html',
  styleUrl: './alloredrs.component.scss'
})
export class AlloredrsComponent implements OnInit{
  private readonly _OrdersService = inject(OrdersService)
  private readonly _AuthService = inject(AuthService)
  idUser:string = this._AuthService.saveUserData()
  orderList:Iorders[] = []
  order!:number
  ngOnInit(): void {
      this._OrdersService.getUserOrders(this.idUser).subscribe({
        next:(res)=>{
          this.orderList = res[res.length - 1].cartItems
          console.log(this.orderList)
        },
        error:(err)=>{
          console.log(err)
        }
      })
  }
}
