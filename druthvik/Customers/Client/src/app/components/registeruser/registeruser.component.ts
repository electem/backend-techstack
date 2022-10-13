import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterUser } from '../../models/userregister.model';
import { UserRegisterService } from '../../services/userregister.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registeruser',
  templateUrl: './registeruser.component.html',
  styleUrls: ['./registeruser.component.css'],
})
export class RegisteruserComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  userRegister: RegisterUser = {
    username: '',
    email: '',
    password: '',
  };
  constructor(
    private formBuilder: FormBuilder,
    private userResgisterService: UserRegisterService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phonenumber: ['', Validators.required],
    });
  }
  get f() {
    return this.registerForm.controls;
  }
  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
  async registerUserValidate(): Promise<void> {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    } else {
      this.registerUser();
      this.router.navigate(['/loginuser']);
    }
  }
  async registerUser(): Promise<void> {
    const userRegister: RegisterUser = {
      username: this.userRegister.username,
      email: this.userRegister.email,
      password: this.userRegister.password,
      phonenumber: this.userRegister.phonenumber,
    };
    await this.userResgisterService.registerUser(userRegister);
  }
}
