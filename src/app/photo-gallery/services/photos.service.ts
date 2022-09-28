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

  getImageById(id:string):IPhotoStorage | null {
    const photos = this.getFavorites();
    return photos.find(photoInStorage => photoInStorage.id === id) || null;
  }

  setFavorite(photo: IPhotoStorage): void {
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

  removeFromFavorite(photo: IPhotoStorage): void {
    const photos = this.getFavorites();
    const index = photos.findIndex((photoInStorage) => JSON.stringify(photoInStorage) === JSON.stringify(photo));

    if (index !== -1) {
      photos.splice(index, 1);
      this.storageService.set('photo', JSON.stringify(photos));
    }
  }
}
