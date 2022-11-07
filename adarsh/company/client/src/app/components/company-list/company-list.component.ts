import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/models/company';
import { LoginUser } from 'src/app/models/ligin-user';
import { CompanyService } from 'src/app/services/company.service';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css'],
})
export class CompanyLIstComponent implements OnInit {
  companies: Company[] = [];
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
 files:File[]=[];

  constructor(
    private companyService: CompanyService,
    private fileService: FileService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.retrieveCompanys();
   
  }
  async retrieveCompanys() {
    this.companies = await this.companyService.getCompanys();
  }
  async deleteCompany(company: Company) {
    await this.companyService.deleteCompany(company.id!);
    this.router.navigate(['/list']);
  }
  selectFile(event:any) {
    this.selectedFiles = event.target.files;
  }
  uploadNewFile(): void {
    this.progress = 0;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this.fileService.uploadFile(this.currentFile);
      }
      this.selectedFiles = undefined;
    }
  }
  public downloadFile(): void {
    this.fileService.getFiles(this.currentFile!).subscribe((response) => {
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
 

