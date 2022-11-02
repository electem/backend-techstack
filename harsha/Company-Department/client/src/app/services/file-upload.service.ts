import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseUrl = environment.url;

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private http: HttpClient) {}

  async upload(file: File): Promise<File> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return await this.http
      .post<File>(baseUrl + 'uploadFile', formData)
      .toPromise();
  }

  public getFiles() {
    return this.http.get(
      baseUrl + 'downloadFile' + '/3baf8108-ba94-4ae7-a959-09a52dd0f673',
      { observe: 'response', responseType: 'blob' }
    );
  }

  //   getFiles() {
  //     return this.http.get(
  //       'http://localhost:8080/downloadFile/3baf8108-ba94-4ae7-a959-09a52dd0f673',
  //       {
  //         responseType: 'blob',
  //         headers: new HttpHeaders().append('Content-Type', 'application/json'),
  //       }
  //     );
  //   }
}
