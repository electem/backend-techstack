import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const url = environment.url;

@Injectable({
  providedIn: 'root',
})
export class FileService {
  files:File[]=[];

  constructor(private http: HttpClient) {}

  async uploadFile(file: File): Promise<File> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return await this.http
      .post<File>(url + '/uploadFile', formData)
      .toPromise();
  }
  
  public getFiles(file: File) {
    return this.http.get(url + 'downloadFile/' + file.name, {
      observe: 'response',
      responseType: 'blob',
    });
  }
 
}
