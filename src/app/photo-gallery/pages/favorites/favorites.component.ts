import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PhotosService } from '../../services/photos.service';
import { StorageService } from '../../../core/services/storage.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FavoritesComponent implements OnInit {

  constructor(
    private photosService: PhotosService,
    private storageService: StorageService,
    private cd: ChangeDetectorRef,
  ) {
  }

  images!: string[];

  parseImg(img: string) {
    return this.photosService.convertImgToObj(img);
  }

  removeAll(){
    this.storageService.clear();
    this.images = [];
    this.cd.detectChanges();
  }

  ngOnInit(): void {
    this.images = this.photosService.getFavorites().map(image => this.photosService.convertObjToImg(image));
  }
}
