import { Component } from '@angular/core';
import { NavBlankComponent } from "../../components/nav-blank/nav-blank.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-blank-layouts',
  standalone: true,
  imports: [NavBlankComponent, RouterOutlet, FooterComponent],
  templateUrl: './blank-layouts.component.html',
  styleUrl: './blank-layouts.component.scss'
})
export class BlankLayoutsComponent {

}
