import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ScrollService } from '../../../core/services/scroll.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private scrollService: ScrollService,
    private cd: ChangeDetectorRef,
  ) {
  }

  loading = false;
  images: string[] = [];
  isFirstFetched = false;

  getImages(){
    this.loading = true;
    this.cd.detectChanges();
    let count = 0;
    for (let i = 0; i < environment.API.limit; i++) {
      this.apiService.getImage$(i).pipe(
        tap((data) => {
          this.images.push(data);
          count++;
          if (count === environment.API.limit) {
            this.loading = false;
            this.isFirstFetched = true;
            this.cd.detectChanges();
            console.log('images: ', this.images);
            const interval = setInterval(() => {
              let target=document.querySelector(`.getMore`) as HTMLElement;
              console.log('target: ',target);
              if(target) {
                console.log('targetOffset: ', target.offsetTop);
                clearInterval(interval);
                this.scrollService.setObserver().observe(target);
              }
            }, 1000)

          }
        })
      ).subscribe();
    }
  }

  ngOnInit() {

    this.getImages();
    this.scrollService.getObservable().subscribe(status=>{
      console.log('status', status);
      if(status){
        console.log('fetch more photos triggered');
        this.getImages();
      }
    })



  }
}
