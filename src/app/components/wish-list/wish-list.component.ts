import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { Iwishlist } from '../../core/interfaces/iwishlist';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [NgClass],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent implements OnInit{
  private readonly _WishlistService = inject(WishlistService)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  wishListCart:Iwishlist[] = []
  loadingAdd: boolean = false;
  loading:boolean = false
  ID:string = ''
  ngOnInit(): void {
    this.loading=true
      this._WishlistService.getLoggedWishList().subscribe({
        next:(res)=>{
          this.loading=false
          this.wishListCart = res.data
        }
      })
  }

  addToCart(id:string):void{
    this.loadingAdd=true
    this.ID = id
    this._CartService.addProductsToCart(id).subscribe({
      next:(res)=>{
        this.loadingAdd=false
        console.log(res)
        this._ToastrService.success('It has been successfully added');
        this.ID = ''
        this.removeItem(id)
        this._CartService.numberOfProducts.set(res.numOfCartItems)
      }
    })
  }
  removeItem(id:string):void{
    this.loadingAdd = true
    this._WishlistService.removeFromWishList(id).subscribe({
      next:(res)=>{
        this.ngOnInit()
        console.log(res.data)
        this.loadingAdd = false
      }
    })
  }
}
