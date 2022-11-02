import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-file-upload-download',
  templateUrl: './file-upload-download.component.html',
  styleUrls: ['./file-upload-download.component.css'],
})
export class FileUploadDownloadComponent implements OnInit {
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';

  fileInfos?: Observable<any>;
  files: any = {};
  constructor(private fileUploadService: FileUploadService) {}

  ngOnInit(): void {}

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;
        console.log(this.currentFile.name);
        this.fileUploadService.upload(this.currentFile);
      }

      this.selectedFiles = undefined;
    }
  }

  public downloadFile(): void {
    this.files = this.fileUploadService.getFiles().subscribe((response) => {
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
