import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionsService } from 'src/app/servicios/sessions.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })

  constructor(
    private sessionsService: SessionsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  onSubmit() {
    this.sessionsService.login(this.loginForm.value).subscribe((data: any) => {
      if (data.token) {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("full_name", data.first_name+" "+data.last_name);
        sessionStorage.setItem("email", data.email);
        this.router.navigate(['/categorias']);
      }else{
        alert("Usuario o clave incorrectos")
      }
    })
  }
}
