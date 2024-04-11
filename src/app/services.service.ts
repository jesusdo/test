import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private headers: HttpHeaders
  private url: string = 'https://localhost:7201/'

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({'Content-Type': 'aplication/json'})
    .set('Access-Control-Allow-Origin', 'https://localhost:7201');

  }

  public get(){
    return this.http.get(this.url+'WeatherForecast');
  }

  public get2(){
    return this.http.get(this.url+'WeatherForecast/pru');
  }

}
