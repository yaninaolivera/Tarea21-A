import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionsService } from 'src/app/servicios/sessions.service';

@Component({
  selector: 'app-singup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    phone: new FormControl('')
  })

  constructor(
    private sessionsService: SessionsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  onSubmit() {
    this.sessionsService.signup(this.signupForm.value).subscribe((data: any) => {
      alert("Creado")
      this.router.navigate(['/login'])
    })
  }
}
