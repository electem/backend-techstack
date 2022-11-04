import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/models/company.model';
import { Department } from 'src/app/models/department.model';
import { CompanyService } from 'src/app/services/company.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css'],
})
export class EditCompanyComponent implements OnInit {
  departmentList: Department[] = [];
  departments: Department[] = [];
  selectedDepartment?: Department = {};
  removeDepartment?: Department = {};
  currentCompany: Company = {
    name: '',
    address: '',
    email: '',
    departments: [],
  };
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';

  constructor(
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private router: Router,
    private fileUploadService: FileUploadService
  ) {}

  ngOnInit(): void {
    this.getDepartments();
    this.getCompanyById(this.route.snapshot.params.id);
  }

  async getDepartments(): Promise<void> {
    this.departments = await this.companyService.getDepartments();
    this.departmentList = this.departments;
  }

  async getCompanyById(id: number) {
    this.currentCompany = await this.companyService.getCompanyById(id);
  }

  async onSelectPushToCurrentDepartment(department: Department): Promise<void> {
    this.selectedDepartment = department;
    this.currentCompany.departments?.push(this.selectedDepartment);
    this.departmentList.splice(
      this.departmentList.indexOf(this.selectedDepartment),
      1
    );
  }

  async onSelectPushToDepartmentList(department: Department) {
    this.selectedDepartment = department;
    this.departmentList.push(this.selectedDepartment!);
    this.currentCompany.departments?.splice(
      this.currentCompany.departments?.indexOf(this.selectedDepartment),
      1
    );
  }

  async updateCompany(): Promise<void> {
    const company = {
      id: this.currentCompany.id,
      name: this.currentCompany.name,
      address: this.currentCompany.address,
      email: this.currentCompany.email,
      phoneNo: this.currentCompany.phoneNo,
      departments: this.currentCompany.departments,
    };
    await this.companyService.updateCompany(this.currentCompany.id!, company);
    this.router.navigate(['/company-list']);
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  upload(): void {
    this.progress = 0;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this.fileUploadService.upload(this.currentFile);
      }
      this.selectedFiles = undefined;
    }
  }

  public downloadFile(): void {
    this.fileUploadService.getFiles(this.currentFile!).subscribe((response) => {
      let fileName = response.headers
        .get('Content-Disposition')
        ?.split(';')[1]
        .split('=')[1];
      let blob: Blob = response.body as Blob;
      let a = document.createElement('a');
      a.download = fileName!;
      a.href = window.URL.createObjectURL(blob);
      a.click();
    });
  }
}
