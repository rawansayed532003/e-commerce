import { Routes } from '@angular/router';
import { AuthLayoutsComponent } from './layouts/auth-layouts/auth-layouts.component';
import { BlankLayoutsComponent } from './layouts/blank-layouts/blank-layouts.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { authGuard } from './core/gards/auth.guard';
import { logedGuard } from './core/gards/loged.guard';
import { DetailsComponent } from './components/details/details.component';
import { ForgetpasswrdComponent } from './components/forgetpasswrd/forgetpasswrd.component';
import { AlloredrsComponent } from './components/alloredrs/alloredrs.component';
import { OredrsComponent } from './components/oredrs/oredrs.component';
import { WishListComponent } from './components/wish-list/wish-list.component';

export const routes: Routes = [
    {path:'' , component:AuthLayoutsComponent , canActivate:[logedGuard] , children:[
        {path:'' , redirectTo:'login' , pathMatch:'full'},
        {path:'login' , component:LoginComponent},
        {path:'register' , component:RegisterComponent},
        {path:'forgetPass' , component:ForgetpasswrdComponent}
    ]
    },
    {path:'' , component:BlankLayoutsComponent , canActivate:[authGuard] , children:[
        {path:'' , redirectTo:'home' , pathMatch:'full'},
        {path:'home' , component:HomeComponent},
        {path:'wishList' , component:WishListComponent},
        {path:'products' , component:ProductComponent},
        {path:'cart' , component:CartComponent},
        {path:'brands' , component:BrandsComponent},
        {path:'categories' , component:CategoriesComponent},
        {path:'details/:id' , component:DetailsComponent},
        {path:'allorders' , component:AlloredrsComponent},
        {path:'orders/:id' , component:OredrsComponent}
    ]},
    {path:'**' , component:NotfoundComponent}
];
