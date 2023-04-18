import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signupForm!: FormGroup;


  constructor(private formBuilder: FormBuilder, private _http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      nombre: [''],
      email: [''],
      password: [''],
      password1: ['']
    })
  }

  //Metodo para crear usuario
  signUp() {
    this._http.post<any>('http://localhost:3000/signup', this.signupForm.value).subscribe(res => {
      alert('Registro exitoso');
      this.signupForm.reset();
      this.router.navigate(['login'])
    }, err => {
      alert('Registro no fue exitoso por favor revise los datos ingresados, gracias!')
    }
    )
  }

}
