import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  getRandomDelay = (delay: number[]): number => Math.floor(delay[0] + Math.random() * (delay[1] + 1 - delay[0]));

  getImage$(i:number):Observable<string> {
    return this.http.get<string>(`${environment.API.url}?time=${Math.floor(Date.now()/1000) + i}`).pipe(
      catchError(async (data) => data.status === 200 ? data.url : ''),
      delay(this.getRandomDelay(environment.API.delay))
    )
  }
}
