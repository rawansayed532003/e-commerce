import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { Ibrand } from '../../core/interfaces/ibrand';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [NgClass],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit{

  private readonly _BrandsService = inject(BrandsService)
  brands:Ibrand[]=[]
  showBrand:Ibrand = {} as Ibrand
  nameBrand:string = ""
  loading:boolean = false
  loadingShow:boolean = false
  ngOnInit(): void {
    this.loading=true
      this._BrandsService.getAllBrands().subscribe({
        next:(res)=>{
          this.loading=false
          console.log(res.data)
          this.brands = res.data
        }
      })
  }

  getSpecificBrand(id:string , brandName:string):void{
    this.loadingShow=true
    this._BrandsService.getSpecificBrand(id).subscribe({
      next:(res)=>{
        this.loadingShow = false
        this.showBrand=res.data
        this.nameBrand=brandName
        console.log(this.nameBrand)
      }
    })
  }
}
