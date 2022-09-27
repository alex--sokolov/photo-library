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

  // sleep = (ms: number) => {
  //   const date = Date.now();
  //   let currentDate = null;
  //   do {
  //     currentDate = Date.now();
  //   } while (currentDate - date < ms);
  // };

  // getPhotoUrls(): string[] {
  //   const now = Date.now();
  //   const photos:string[] = [];
  //
  //   for (let i = 0; i < environment.API.limit; i++) {
  //     this.http.get<string>(`${environment.API.url}?time=${now + i}`)
  //       .pipe(
  //         catchError(async (data) => {
  //           const url = data.status === 200 ? await data.url : '';
  //           photos.push(url);
  //           console.log('i', i);
  //         })
  //       )
  //   }
  //   return photos;
  // }
  //
  // getImages$():Observable<string[]> {
  //
  //   const urls = this.getPhotoUrls();
  //
  //   return of(urls).pipe(
  //     tap(data => {
  //       console.log('url: ', data);
  //     }),
  //     delay(this.getRandomDelay(environment.API.delay))
  //   );
  // }

  getImage$(i:number):Observable<string> {
    return this.http.get<string>(`${environment.API.url}?time=${Date.now() + i}`).pipe(
      catchError(async (data) => data.status === 200 ? data.url : ''),
      delay(this.getRandomDelay(environment.API.delay))
    )
  }
}
