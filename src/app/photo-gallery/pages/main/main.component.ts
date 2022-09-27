import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ScrollService } from '../../../core/services/scroll.service';
import { PhotosService } from '../../services/photos.service';

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
    private photosService: PhotosService,
    private cd: ChangeDetectorRef,
  ) {
  }

  loading = false;
  images: string[] = [];
  isFirstFetched = false;

  parseImg(img: string) {
    return this.photosService.convertImgToObj(img);
  }

  getImages() {
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
            const interval = setInterval(() => {
              let target = document.querySelector(`.getMore`) as HTMLElement;
              if (target) {
                clearInterval(interval);
                this.scrollService.setObserver().observe(target);
              }
            }, 1000);
          }
        })
      ).subscribe();
    }
  }

  setFavorite(e: MouseEvent) {
    this.photosService.setFavorite(e);
  }

  ngOnInit() {
    this.getImages();
    this.scrollService.getObservable().subscribe(status => {
      if (status) {
        this.getImages();
      }
    });
  }
}
