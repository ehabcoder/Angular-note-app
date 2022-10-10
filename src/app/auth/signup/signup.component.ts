import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UniqueEmail } from 'src/app/auth/validators/unique-email';
import { MatchPassword } from '../validators/match-password';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  authForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ], [ this.emailValid.validate ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]),
    passwordConfirmation: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]),
  }, { validators: [ this.passwordMatch.validate ] });

  constructor(private router: Router, private authService: AuthService, private emailValid: UniqueEmail, private passwordMatch: MatchPassword) { }

  ngOnInit(): void {}

  showFormErrors() {
    return this.authForm.get('password').touched && 
           this.authForm.get('passwordConfirmation').touched &&
           this.authForm.errors;
  }

  onSubmit() {
    if (this.authForm.invalid) return;
    const creds = {
      name: this.authForm.value.name,
      email: this.authForm.value.email,
      password: this.authForm.value.password
    } 
    this.authService.signup(creds).subscribe({
      next: (res) => {
        // Navigate to some other route
        this.router.navigateByUrl('/home')
      },
      error: (err) => {
        if(!err.status) {
          this.authForm.setErrors({noConnection: true})
        } else {
          this.authForm.setErrors({ unknownError: true })
        }
      }
    })
  }
}
