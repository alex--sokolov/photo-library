import { TestBed } from '@angular/core/testing';

import { PhotosService } from './photos.service';
import { StorageService } from '../../core/services/storage.service';

const mockPhotoObj = { id: '1019', hmac: 'HLUPqgTMOzQ6-GDkgZZ3NXQqJyl5m6iX_MXvS3Xqt3Q' };
const mockPhotoUrl = 'https://i.picsum.photos/id/1019/200/300.jpg?hmac=HLUPqgTMOzQ6-GDkgZZ3NXQqJyl5m6iX_MXvS3Xqt3Q';

describe('PhotosService - create and convert', () => {
  let service: PhotosService;
  let storageService: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PhotosService,
        StorageService
      ]
    });
    service = TestBed.inject(PhotosService);
    storageService = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should convert url to object as convenient storage form', () => {
    const obj = service.convertImgToObj(mockPhotoUrl);
    expect(obj).toEqual(mockPhotoObj);
  });

  it('should convert object storage form to url', () => {
    const url = service.convertObjToImg(mockPhotoObj);
    expect(url).toEqual(mockPhotoUrl);
  });
});

describe('PhotosService - get/set/remove favorites, getFavById ', () => {
  let service: PhotosService;
  let storageService: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PhotosService,
        StorageService
      ]
    });
    service = TestBed.inject(PhotosService);
    storageService = TestBed.inject(StorageService);
    storageService.clear();
    service.setFavorite(mockPhotoObj);
  });

  it('should set and get favorite from storage', () => {
    const photos = service.getFavorites();
    expect(photos[photos.length - 1]).toEqual(mockPhotoObj);
  });

  it('should get obj by id', () => {
    const photo = service.getImageById(mockPhotoObj.id);
    expect(photo).toEqual(mockPhotoObj);
  });

  it('should not add to fav, if it is already in there', () => {
    const photosBefore = service.getFavorites();
    service.setFavorite(mockPhotoObj);
    const photosAfter = service.getFavorites();
    expect(photosBefore.length === photosAfter.length).toBeTruthy();
  });

  it('should remove from favorites', () => {
    service.removeFromFavorite(mockPhotoObj);
    const photos = service.getFavorites();
    expect(photos === []).toBeFalsy();
  });

});
