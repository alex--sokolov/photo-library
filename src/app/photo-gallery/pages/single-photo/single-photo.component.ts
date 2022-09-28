import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PhotosService } from '../../services/photos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-photo',
  templateUrl: './single-photo.component.html',
  styleUrls: ['./single-photo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SinglePhotoComponent implements OnInit {

  private id: string = '';

  constructor(
    private photosService: PhotosService,
    private activateRoute: ActivatedRoute
  ) {
    activateRoute.params.subscribe(params => this.id = params['id']);
  }

  img!: string;
  isRemovedFromFav = false;

  parseImg(img: string) {
    return this.photosService.convertImgToObj(img);
  }

  toggleFav(action:string) {
    if (action === 'remove') {
      this.photosService.removeFromFavorite(this.photosService.convertImgToObj(this.img))
    } else if (action === 'add'){
      this.photosService.setFavorite(this.photosService.convertImgToObj(this.img))
    }
    this.isRemovedFromFav = !this.isRemovedFromFav;
  }

  ngOnInit(): void {
    const imgObj = this.photosService.getImageById(this.id);
    if (imgObj) {
      this.img = this.photosService.convertObjToImg(imgObj);
    } else {
      this.isRemovedFromFav = true;
    }
  }
}
