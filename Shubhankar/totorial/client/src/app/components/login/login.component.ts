import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators,FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginUser } from 'src/app/models/login';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform!: FormGroup;
  login: LoginUser = {
    username: '',
    password: '',
    role: '',
    
  }
  submitted=false
  role?: { role: string; }[];
  constructor( private tutorialService: TutorialService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginform = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['',  Validators.required ],
    })
    this.role = this.getRoledata();
    
  }

  getRoledata() {
    return this.tutorialService.getRole();
  }

  async loginData(){
    this.submitted = true
    if(this.loginform.invalid){
    return
}else{
     this.LoginDetail();
}
}
async LoginDetail(){
       const login: LoginUser = {
        username: this.login.username,
        password: this.login.password,
        role: this.login.role ,
      };
      
      await this.tutorialService.createlogin(login);
      this.router.navigate(['/tutorials']);
      console.log(login);
    } 
get fval() {
    return this.loginform.controls;
  }
  async signup(){
    this.submitted = true;
    if (this.loginform.invalid) {
    return;
    }
    
    }
}

