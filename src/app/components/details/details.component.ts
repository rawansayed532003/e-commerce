import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../core/services/products.service';
import { IProducts } from '../../core/interfaces/iproducts';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';
import { NgClass } from '@angular/common';
import { Iwishlist } from '../../core/interfaces/iwishlist';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CarouselModule , NgClass],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit , OnDestroy{
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _ProductsService = inject(ProductsService)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  private readonly _WishlistService = inject(WishlistService)
  heartColor : string[] = []
  wishListCart:string[] = []
  loadingAdd:boolean = false
  ID:string = ''

  detailsSub!:Subscription
  parIdSub!:Subscription
  detailsProduct:IProducts | null = null

  customOptionsDetails: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay:true,
    autoplayTimeout:2000,
    autoplayHoverPause:true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: true
  }

  ngOnInit(): void {
    
    this._WishlistService.getLoggedWishList().subscribe({
      next:(res)=>{
        const newData = res.data.map((item:any)=> item.id)
        this.wishListCart = newData
        console.log(this.wishListCart)
      },
    })
    
    this.parIdSub =  this._ActivatedRoute.paramMap.subscribe({
        next:(p)=>{
          let idProduct = p.get('id')
          this.detailsSub = this._ProductsService.getSpecificeProducts(idProduct).subscribe({
            next:(res)=>{
              this.detailsProduct = res.data
            },
            error:(err)=>{
              console.log(err)
            }
          })
        }
      })
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

  ngOnDestroy(): void {
      this.parIdSub.unsubscribe();
      this.detailsSub.unsubscribe()
  }
}
