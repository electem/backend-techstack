import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpRequest,
  HttpEvent,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const baseUrl = environment.url1;

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  file = File;
  constructor(private http: HttpClient) {}

  async uploadFile(file: File) {
    const headerDict = {
      Accept: 'multipart/form-data',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    const formData = new FormData();
    formData.append('file', file);
    return await this.http.post(baseUrl + '/file', formData).subscribe();
  }

  getALlFiles(file: File) {
    return this.http.get(`${baseUrl + '/file'}`, {
      observe: 'response',
    });
  }

  downloadFile(file: File) {
    return this.http.get(`${baseUrl + '/file'}/${file.name}`, {
      observe: 'response',
    });
  }
}
