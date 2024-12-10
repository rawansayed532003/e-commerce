import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private readonly _HttpClient:HttpClient) { }
 
  checkOut(id:string|null , details:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${id}?url=${window.location.origin}`,
      {
        'shippingAddress':details
      },
    )
  }
  getUserOrders(idUser:string):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/orders/user/${idUser}`)
  }
}
