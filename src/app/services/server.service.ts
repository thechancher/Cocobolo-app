import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Probability, Result } from '../models/image';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private readonly URL_ROOT: string = "CNN"
  public analyzing: boolean = false
  public serverHealth: boolean = true
  public serverError: string = ""

  constructor(protected http: HttpClient) { }

  public async analyze(image: string): Promise<Probability[] | undefined> {
    console.log("this.analyzing: ", this.analyzing);
    const result: Result | void = await firstValueFrom(this.http.post<Result>(this.URL_ROOT,
      {
        id: 123,
        image: image
      })).catch(reason => {
        console.log("reason: ", reason);
        this.serverError = reason.message
      }).finally(() => {
        console.log("request finished");
      })

    if (result) {
      return result.probs
    } else {
      return undefined
    }
  }
}
