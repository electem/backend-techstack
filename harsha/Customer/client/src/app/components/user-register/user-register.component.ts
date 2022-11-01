import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent implements OnInit {
  submitted: boolean = false;
  registerForm!: FormGroup;
  user: User = {
    name: '',
    email: '',
    password: '',
  };

  constructor(
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      phone_no: ['', Validators.required],
    });
  }

  get validation() {
    return this.registerForm.controls;
  }

  signup() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    alert('form fields are validated successfully!');
    this.saveUser();
  }

  async saveUser(): Promise<void> {
    const user: User = {
      name: this.user.name,
      email: this.user.email,
      password: this.user.password,
      phoneNo: this.user.phoneNo,
    };
    await this.customerService.createUser(user);
    this.router.navigate(['/userLogin']);
  }
}
