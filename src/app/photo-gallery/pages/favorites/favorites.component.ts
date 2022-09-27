import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PhotosService } from '../../services/photos.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FavoritesComponent implements OnInit {

  constructor(
    private photosService: PhotosService,
  ) { }

  images!:string[];

  parseImg(img: string) {
    return this.photosService.convertImgToObj(img);
  }
  ngOnInit(): void {
    this.images = this.photosService.getFavorites().map(image => this.photosService.convertObjToImg(image));
  }
}
