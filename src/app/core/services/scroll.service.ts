import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  private intersectionSubject = new BehaviorSubject<boolean>(false);
  public pageHeight = document.documentElement.scrollHeight;

  public intersectionOptions = {
    root: null,
    rootMargin: `0px`,
    threshold: [0, 0.5, 1]
  };
  private observer: any = new IntersectionObserver(this.intersectionCallback.bind(this), this.intersectionOptions);

  getObservable() {
    return this.intersectionSubject.asObservable();
  }

  intersectionCallback(entries: any, observer: any) {
    console.log('pageHeight: ', this.pageHeight);
    entries.forEach((entry: any) => {
      console.log('entry: ', entry);
      console.log('entry.intersectionRatio: ', entry.intersectionRatio);
      entry.intersectionRatio === 1 ? this.intersectionSubject.next(true) : this.intersectionSubject.next(false);
    });
  }

  setObserver() {
    return this.observer;
  }

}
