import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private readonly URL_ROOT: string = "https://35.222.94.6/CNN"
  public analyzing: boolean = false

  constructor(protected http: HttpClient) { }

  public async analyze(image: string): Promise<any> {
    console.log("this.analyzing: ", this.analyzing);
    return this.http.post<any>(this.URL_ROOT,
      {
        id: 123,
        image: image
      }).toPromise()
  }
}
