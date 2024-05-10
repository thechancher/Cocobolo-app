import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ClassName, Probability, Result } from '../models/image';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private readonly api_CNN: string = "https://35.222.94.6/CNN"
  private readonly api_class_names: string = "https://35.222.94.6/class_names"
  public analyzing: boolean = false
  public serverHealth: boolean = true
  public serverError: string = ""

  public class_names: ClassName[] | undefined

  constructor(protected http: HttpClient) { }

  public async getClassNames(): Promise<void> {
    const result: ClassName[] | void = await firstValueFrom(this.http.get<ClassName[]>(this.api_class_names))
      .catch(reason => {
        console.log("reason: ", reason);
      })
      .finally(() => {
        console.log("getClassNames");
      })

    if (result) {
      this.class_names = result
      console.log("this.class_names: ", this.class_names[3]);
    }
  }

  public async analyze(image: string): Promise<Probability[] | undefined> {
    console.log("this.analyzing: ", this.analyzing);
    const result: Result | void = await firstValueFrom(this.http.post<Result>(this.api_CNN,
      {
        id: 123,
        image: image
      })).catch(reason => {
        console.log("reason: ", reason);
        this.serverError = reason.message
      }).finally(() => {
        console.log("analyze");
      })

    if (result) {
      console.log("result: ", result);
      return result.probs
    } else {
      return undefined
    }
  }
}
