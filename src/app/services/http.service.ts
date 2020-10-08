
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public urlHttp: string = environment.API_URL;
  private TOKEN: string = environment.WIRID_LAB_TOKEN;
  constructor(
    private http: HttpClient
  ) {
    console.log('url:', this.urlHttp);
  }

  getHeader(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "Accept": "application/json",
      'WIRID-LAB-AUTH-TOKEN': this.TOKEN,
    });
    return headers;
  }

  httpGet(url: string): any {
    return this.http.get(this.urlHttp + url, { headers: this.getHeader() });
  }
}
