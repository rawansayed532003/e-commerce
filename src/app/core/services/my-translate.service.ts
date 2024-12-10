import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, Renderer2, RendererFactory2, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Injectable({
  providedIn: 'root'
})
export class MyTranslateService {
  private _TranslateService = inject(TranslateService)
  private platformId = inject(PLATFORM_ID) 
  private _Renderer2 = inject(RendererFactory2).createRenderer(null , null) 
  defaultLang = 'de';
  constructor() { 

    if (isPlatformBrowser(this.platformId)) {
      const savedLang = localStorage.getItem('lng');
      if (savedLang) {
        this.defaultLang = savedLang;
      }
      this._TranslateService.setDefaultLang(this.defaultLang);
      this._TranslateService.use(this.defaultLang);
    }
    this.changeDirection()
  }

  changeLang(lang: string) {
    this._TranslateService.use(lang);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('lng', lang);
    }
    this.changeDirection()
  }

  changeDirection():void {
    if(localStorage.getItem('lng') === 'en'){
          // dir ltr
          document.dir = 'ltr';
          this._Renderer2.setAttribute(document.documentElement , 'dir' , 'ltr')
          this._Renderer2.setAttribute(document.documentElement , 'lang' , 'en')
          
    }
    else if (localStorage.getItem('lng') === 'ar') {
      //dir rtl
      this._Renderer2.setAttribute(document.documentElement , 'dir' , 'rtl')
      this._Renderer2.setAttribute(document.documentElement , 'lang' , 'ar')

    }
  
  }
}
