import { Component } from '@angular/core';
import { NavAuthComponent } from "../../components/nav-auth/nav-auth.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-auth-layouts',
  standalone: true,
  imports: [NavAuthComponent, RouterOutlet, FooterComponent],
  templateUrl: './auth-layouts.component.html',
  styleUrl: './auth-layouts.component.scss'
})
export class AuthLayoutsComponent {

}
