import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FileUploadService } from '../../services/file.service';

@Component({
  selector: 'app-fileuploaddownload',
  templateUrl: './fileuploaddownload.component.html',
  styleUrls: ['./fileuploaddownload.component.css'],
})
export class FileuploaddownloadComponent implements OnInit {
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';

  constructor(
    private http: HttpClient,
    public fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private fileService: FileUploadService,
  ) {}
  registrationForm = this.fb.group({
    file: [null],
  });
  @ViewChild('fileInput') el: ElementRef | undefined;
  editFile = true;
  removeUpload = false;
  downloadFileName!: string;
  file!: File;
  fileInfos?: any;
  ngOnInit(): void {
    this.fileInfos = this.fileService.getALlFiles(this.file);
  }

  async uploadImage(): Promise<void> {
    this.fileService.uploadFile(this.file);
  }

  // selectFile(event: any): void {
  //   this.selectedFiles = event.target.files;
  // }
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
    return await this.fileService
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
