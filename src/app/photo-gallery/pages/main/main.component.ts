import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { tap } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private cd: ChangeDetectorRef,
  ) {
  }

  loading = false;
  images: string[] = [];

  ngOnInit() {
    this.loading = true;
    let count = 0;
    for (let i = 0; i < environment.API.limit; i++) {
      this.apiService.getImage$(i).pipe(
        tap((data) => {
          this.images.push(data);
          count++;
          if (count === environment.API.limit) {
            this.loading = false;
            this.cd.detectChanges();
            console.log('images: ', this.images);
          }
        })
      ).subscribe();
    }
  }
}
