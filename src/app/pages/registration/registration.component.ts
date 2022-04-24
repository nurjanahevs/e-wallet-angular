import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import {  UserService } from '../services/user.service'


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registerForm = this.fb.group({
    email: ['', Validators.required],
    name: ['', Validators.required],
    identityNumb: ['', Validators.required],
    password: ['', Validators.required],
  });

  buttonHidden: any;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  registration() {
    this.userService.register(this.registerForm.value).subscribe((res) => {
      console.log(res.name);
      console.log(this.registerForm);
      console.log(res.name, 'welcome');
      this.router.navigate(['/login']);
    })
  }

  onSubmit() {
    console.log(this.registerForm.value);
    this.userService.register(this.registerForm.value).subscribe((result) => {
      console.log('result', result);
      this.router.navigate(['/login']);
    });
  }


}
