import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Icart } from '../../core/interfaces/icart';
import { CurrencyPipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe , NgClass , RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  productsOfCart:Icart = {} as Icart
  numberOfItems:number = 0
  moveItems:boolean = false
  loading:boolean = false
  ngOnInit(): void {
    this.loading=true
      this._CartService.getProductsCart().subscribe({
        next:(res)=>{
          this.loading=false
          console.log(res.data)
          this.numberOfItems = res.data.products.length
          this._CartService.numberOfProducts.set(this.numberOfItems)
          console.log(this._CartService.numberOfProducts)
          this.productsOfCart = res.data
      }
      })
  }

  removeItem(id:string):void{
    this.moveItems = true
    this._CartService.deleteItem(id).subscribe({
      next:(res)=>{
        console.log(res)
        this.productsOfCart = res.data
        this.numberOfItems = res.data.products.length
        this.moveItems = false
        this._CartService.numberOfProducts.set(this.numberOfItems)
      }
    })
  }

  addItem(id:string , count:number):void{
    this.moveItems = true
    this._CartService.updateCount(id,count).subscribe({
      next:(res)=>{
        console.log(res)
        this.productsOfCart = res.data
        this.moveItems = false
        this._CartService.numberOfProducts.set(this.numberOfItems)
      }
    })
  }
  clearCart():void{
    this.moveItems = true
    this._CartService.clearCart().subscribe({
      next:(res)=>{
        console.log(res)
       if(res.message === "success"){
        this.productsOfCart = { totalCartPrice: 0 } as Icart
        this.numberOfItems = 0
        this.moveItems = false
        this._CartService.numberOfProducts.set(0)
        this._ToastrService.success('It has been successfully Clear 🛺');
       }
      }
    })
  }
}
