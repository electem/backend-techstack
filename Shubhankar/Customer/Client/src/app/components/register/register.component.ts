import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from 'src/app/models/register';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerform!: FormGroup;
  registeredUser: Register = {
    name: '',
    email: '',
    password: '',
    phonenumber: 0,
  };
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerform = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      phonenumber: [' ', Validators.required],
    });
  }

  get fval() {
    return this.registerform.controls;
  }
  async signup() {
    this.submitted = true;
    if (this.registerform.invalid) {
      return;
    }
  }

  async Submit() {
    this.submitted = true;
    const registeredUser: Register = {
      name: this.registeredUser.name,
      email: this.registeredUser.email,
      password: this.registeredUser.password,
      phonenumber: this.registeredUser.phonenumber,
    };
    await this.userService.createlogin(registeredUser);
    this.router.navigate(['/loginusers']);
  }
}
