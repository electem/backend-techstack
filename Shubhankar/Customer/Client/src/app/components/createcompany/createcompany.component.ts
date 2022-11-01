import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Company } from 'src/app/models/company';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-createcompany',
  templateUrl: './createcompany.component.html',
  styleUrls: ['./createcompany.component.css'],
})
export class CreatecompanyComponent implements OnInit {
  createCompany!: FormGroup;
  submitted: boolean = false;
  company: Company = {
    name:'',
    department:'',
    address:'',
  };
  
  constructor(private userService: UserService, private router: Router,
    private formBuilder: FormBuilder,) {}

  ngOnInit(): void {
    this.createCompany = this.formBuilder.group({
      name: ['', Validators.required],
      department: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  get fval() {
    return this.createCompany.controls;
  }
  async signup() {
    this.submitted = true;
    if (this.createCompany.invalid) {
      return;
    }
  }

  async getSubmit() {
    this.submitted = true;
    const companyinfo: Company = {
      name: this.company.name,
      department: this.company.department,
      address: this.company.address,
    };
    await this.userService.createcompany(companyinfo);
    this.router.navigate(['/company']);
  }
}
