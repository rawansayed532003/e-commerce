import { Component, computed, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { TranslateModule } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/my-translate.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink , RouterLinkActive , TranslateModule],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent implements OnInit {
  readonly _AuthService = inject(AuthService)
  readonly _CartService = inject(CartService)
  readonly _MyTranslateService = inject(MyTranslateService)
  count = computed(this._CartService.numberOfProducts)
  ngOnInit(): void {
      this._CartService.getProductsCart().subscribe({
        next:(res)=>{
          this._CartService.numberOfProducts.set(res.numOfCartItems)
        }
      })
  }

  change(lang:string):void{

    this._MyTranslateService.changeLang(lang)

  }
}
