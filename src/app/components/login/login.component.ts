import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '@app/services/student.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  studentDetails:'';
  constructor( private formBuilder: FormBuilder,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: ''
  });
  }
  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }
  onSubmit(){
    const data = {
      email:this.f.email.value, 
      passoword:this.f.password.value
    }
    this.studentService.login(data)
      .subscribe(
        response => {
          this.studentDetails=response;
         // const semesterUrl = this.route.snapshot.queryParams['/semester'] || '/';
          //this.router.navigateByUrl(semesterUrl)
          this.router.navigate(['/semester']);
          console.log(response);
        },
        error => {
          console.log(error);
        });  
  }
}
