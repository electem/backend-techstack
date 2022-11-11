import { HttpClient } from '@angular/common/http';
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

  public getFiles(file: File) {
    return this.http.get(baseUrl + 'downloadFile/' + file.name, {
      observe: 'response',
      responseType: 'blob',
    });
  }
}
