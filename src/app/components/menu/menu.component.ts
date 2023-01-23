import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  title = '{expensable}';
  full_name = sessionStorage.getItem("full_name");
  email = sessionStorage.getItem("email");

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  logout(){
    sessionStorage.removeItem("token");
    this.router.navigate(['/login']);
  }
}
