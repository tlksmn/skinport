import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {take} from "rxjs";

@Injectable()
export class ApiService {
  constructor(private readonly httpClient: HttpClient) {
  }

  get<T>(url: string, params: Record<string, string | number | boolean>) {
    return this.httpClient.get<T>(url, {params}).pipe(take(1))
  }

  post<T>(url: string, body: Record<string, string | number | boolean>) {
    return this.httpClient.post<T>(url, body, {withCredentials: true}).pipe(take(1))
  }
}
