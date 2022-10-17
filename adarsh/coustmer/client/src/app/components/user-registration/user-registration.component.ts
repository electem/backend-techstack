import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { CustmerService } from 'src/app/services/custmer.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  users: User[] = [];
  registerUser: User={
  userName: "",
  password: "",
  email: "",
 
  }
  registerForm!: FormGroup;
  submitted: boolean = false;
  

  constructor(private custmerService: CustmerService,
    private router: Router,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      phoNum: ['', Validators.required],
    });
  }
  signupUser() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    alert('form fields are validated successfully!');
    this.saveRegisteruser();
  }
  get fval() {
    return this.registerForm.controls;
  }
  async saveRegisteruser(): Promise<void> {
    const userRegister = {
      userName: this.registerUser.userName,
      password: this.registerUser.password,
      email: this.registerUser.email,
      phoNum: this.registerUser.phoNum,

    };
    await this.custmerService.createNewUser(userRegister);
    this.router.navigate(['login']);
  }
  

}
