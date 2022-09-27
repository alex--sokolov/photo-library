import { Injectable } from '@angular/core';
import { IPhotoStorage } from '../../core/models/photos';
import { environment } from '../../../environments/environment';
import { StorageService } from '../../core/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  constructor(
    private storageService: StorageService
  ) {
  }

  convertImgToObj(img: string): IPhotoStorage {
    const strBeginning = environment.API.urlPicsum[0];
    const imgFromId = img.slice(strBeginning.length, img.length);
    const id = imgFromId.slice(0, imgFromId.indexOf('/'));
    const hmac = img.slice(img.indexOf('=') + 1, img.length);
    return { id, hmac };
  }

  convertObjToImg(obj: IPhotoStorage): string {
    const strBeginning = environment.API.urlPicsum[0];
    const strMiddle = environment.API.urlPicsum[1];
    return `${strBeginning}${obj.id}${strMiddle}${obj.hmac}`
  }

  getFavorites(): IPhotoStorage[]  {
    const photosValue = this.storageService.get('photo');
    return photosValue ? JSON.parse(photosValue) : [];
  }

  setFavorite(e: MouseEvent): void {
    const alt = (e.target as HTMLElement).getAttribute('alt') || '';
    const indexSign = alt.indexOf('|');

    const photo: IPhotoStorage = {
      id: alt.slice(0, indexSign),
      hmac: alt.slice(indexSign + 1, alt.length)
    };

    const photos = this.getFavorites();

    let isAlreadyExists = false;
    photos.forEach((photoInStorage) => {
      if (JSON.stringify(photoInStorage) === JSON.stringify(photo)) {
        isAlreadyExists = true;
      }
    });

    if (!isAlreadyExists) {
      photos.push(photo);
      this.storageService.set('photo', JSON.stringify(photos));
    }
  }
}
