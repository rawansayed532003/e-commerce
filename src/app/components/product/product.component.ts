import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { IProducts } from '../../core/interfaces/iproducts';
import { Subscription } from 'rxjs';
import { Icategory } from '../../core/interfaces/icategory';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../core/pipes/search.pipe';
import {  NgClass} from '@angular/common';
import { TermtextPipe } from '../../core/pipes/termtext.pipe';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink , FormsModule , SearchPipe , TermtextPipe ,NgClass],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  private readonly _ProductsService = inject(ProductsService)
  private readonly _CartService = inject(CartService)
  private readonly _WishlistService = inject(WishlistService)
  private readonly _ToastrService = inject(ToastrService)
  private readonly _NgxSpinnerService = inject(NgxSpinnerService)
  productList:IProducts[]=[]
  categoryList:Icategory[]=[]
  getAllProductSub!:Subscription
  getAllCategoriesSub!:Subscription;
  text:string = ''
  loading:boolean = false
  loadingAdd:boolean = false
  wishListCart:string[] = []
  ID:string = ''

  ngOnInit(): void {
    this.loading=true
      this.getAllProductSub = this._ProductsService.getAllProducts().subscribe({
        next:(res)=>{
          this.loading=false
          this.productList = res.data
        },
        error:(err)=>{
          console.log(err)
        }
      })
      this._WishlistService.getLoggedWishList().subscribe({
        next:(res)=>{
          const newData = res.data.map((item:any)=> item.id)
          this.wishListCart =newData
          console.log(this.wishListCart)

        },
      })
  }
  ngOnDestroy(): void {
      this.getAllProductSub?.unsubscribe()
      this.getAllCategoriesSub?.unsubscribe()
  }

  addCart(id:string):void{
        this.ID = id
    this._CartService.addProductsToCart(id).subscribe({
      next:(res)=>{
        console.log(res)
        this.ID = ''
        this._CartService.numberOfProducts.set(res.numOfCartItems)
        this._ToastrService.success('It has been successfully added 🛺');
      }
    })
  }
  addToWishList(id:string):void{

    if(this.wishListCart.includes(id)){
      this.loadingAdd = true
      this._WishlistService.removeFromWishList(id).subscribe({
        next:(res)=>{
          console.log(res.data)
          this.wishListCart = res.data
          this.loadingAdd = false
          this._ToastrService.success('It has been successfully Delete item from wishList')
        }
      })

    }
    else{
      this.loadingAdd = true
      this._WishlistService.addToWishList(id).subscribe({
        next:(res)=>{
          console.log(res.data)
          this.wishListCart=res.data
          this.loadingAdd = false
          this._ToastrService.success('It has been successfully added to wishList 💗')
        }
      })
    }
  }
  
}
