import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModprimengModule } from '../../modprimeng.module';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { passwordMatchValidator } from '../../shared/password-match.directives';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, ModprimengModule, RouterModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registerForma: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForma = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z ]+$/)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [
          Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/),
        ]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: passwordMatchValidator 
      }
    );
  }

  get name() {
    return this.registerForma.get('name');
  }

  get email() {
    return this.registerForma.get('email');
  }

  get password() {
    return this.registerForma.get('password');
  }

  get confirmPassword() {
    return this.registerForma.get('confirmPassword');
  }

  onSubmit() {
    if (this.registerForma.valid) {
      console.log('Formulario válido:', this.registerForma.value);
      this.router.navigate(['/dashboard']);
    }
  }
}
