import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company } from 'src/app/models/company';
import { Department } from 'src/app/models/department';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-editdepartment',
  templateUrl: './editdepartment.component.html',
  styleUrls: ['./editdepartment.component.css']
})
export class EditdepartmentComponent implements OnInit {
department: Department ={
  name:'',
  type:'',
}
companys?: Company[] = [];
 
  constructor(private userService: UserService,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.retrieveCompany();
    this.getDepartmentById(this.route.snapshot.params.id)
  }

  async retrieveCompany(): Promise<void> {
    this.companys = await this.userService.getCompany();
  }
  

  async getDepartmentById(id: number): Promise<void> {
    this.department = await this.userService.getDepartmentById(id);
  }

 async updateDepartment(): Promise<void> {
  const department: Department = {
    id: this.department.id,
    name: this.department.name,
    type: this.department.type,
    date:this.department.date,
  };
  await this.userService.updateDepartment(department);
}
}
