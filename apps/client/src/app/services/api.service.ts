import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {take} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable()
export class ApiService {
  private readonly API_URL = environment.API_URL;

  constructor(private readonly httpClient: HttpClient) {}

  get<T>(url: string, params: Record<string, string | number | boolean>) {
    return this.httpClient.get<T>(this.API_URL + url, {params}).pipe(take(1))
  }

  post<T, K>(url: string, body: Record<string, string | number | boolean> | K) {
    return this.httpClient.post<T>(this.API_URL + url, body, {withCredentials: true}).pipe(take(1))
  }
}
