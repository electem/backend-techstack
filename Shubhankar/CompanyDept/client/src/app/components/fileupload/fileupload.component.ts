import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css'],
})
export class FileuploadComponent implements OnInit {
  fileName = '';

  constructor( public fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private userService: UserService,
    private http:HttpClient) {}

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
    this.userService.uploadFile(this.file);
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
    return await this.userService
      .downloadFile(this.file)
      .subscribe((response :any) => {
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
  

