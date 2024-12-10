import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategory } from '../../core/interfaces/icategory';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [NgClass],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {

  private readonly _CategoriesService = inject(CategoriesService)
  categories:Icategory[] = []
  subCategories:Icategory[] = []
  catName:string = ""
  showSubCat:boolean = false
  loading:boolean = false
  ngOnInit(): void {
    this.loading=true
      this._CategoriesService.getAllCategories().subscribe({
        next:(res)=>{
          this.loading=false
          console.log(res.data)
          this.categories = res.data
        },
      })
  }

  getSubCat(id:string , nameCat:string):void{
    this.showSubCat =true
    this._CategoriesService.GetAllSubCategoriesOnCategory(id).subscribe({
      next:(res)=>{
        this.showSubCat=false
        console.log(res.data)
        this.subCategories = res.data
        this.catName=nameCat + ' Subcategories'
      }
    })
  }
}
