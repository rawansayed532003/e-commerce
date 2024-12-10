import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  numberOfProducts:WritableSignal<number> = signal(0)
  constructor(private readonly _HttpClient : HttpClient) { }
  

  addProductsToCart(id:string):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart` , 
      {
        productId:id
      },
      
    )
  }
  getProductsCart():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart` , 
      )
  }
  deleteItem(id:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}` , 
     
    )
  }
  updateCount(id:string , newCount:number):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${id}` , 
      {
        "count": newCount
      },
    )
  }
  clearCart():Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart` , 
    )
  }
}
