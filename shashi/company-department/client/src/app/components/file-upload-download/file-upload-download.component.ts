import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CompanyService } from 'src/app/services/companyDepartment.service';

@Component({
  selector: 'app-file-upload-download',
  templateUrl: './file-upload-download.component.html',
  styleUrls: ['./file-upload-download.component.css'],
})
export class FileUploadDownloadComponent implements OnInit {
  constructor(
    public fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private companyService: CompanyService
  ) {}
  registrationForm = this.fb.group({
    file: [null],
  });
  @ViewChild('fileInput') el: ElementRef | undefined;
  editFile = true;
  removeUpload = false;
  downloadFileName!: string;
  file!: File;

  ngOnInit(): void {}

  async uploadImage(): Promise<void> {
    this.companyService.uploadFile(this.file);
  }

  chooseFile(event: any) {
    const reader = new FileReader();
    const file = event.target.files[0];
    this.file = file;
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.registrationForm.patchValue({
          file: reader.result,
        });
        this.editFile = false;
        this.removeUpload = true;
      };
      this.cd.markForCheck();
    }
  }
  async downloadFile() {
    return await this.companyService
      .downloadFile(this.file)
      .subscribe((response) => {
        const filename = response.headers
          .get('content-disposition')
          ?.split(';')[1]
          .split('=')[1];
        const blob: Blob = response.body as Blob;
        const a = document.createElement('a');
        a.download = filename!;
        a.href = window.URL.createObjectURL(blob);
        a.click();
      });
  }
}