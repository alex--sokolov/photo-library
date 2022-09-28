import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';

const key = 'key';
const value = JSON.stringify([{test: '123', another: 15}]);

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
    service.set(key, value);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get and set specified stringified object to storage by its key', () => {
    const value = JSON.parse(service.get(key) as string);
    expect(value[0].another === 15 && value[0].test === '123').toBeTruthy()
  });

  it('should remove record by key', () => {
    service.remove(key);
    const value = service.get(key);
    expect(value).toBeFalsy();
  });

  it('should clear all records for current domain', () => {
    service.set('someKey', 'someValue');
    service.set('someOtherKey', 'someAnotherValue');
    service.clear();
    const value1 = service.get(key);
    const value2 = service.get('someKey');
    const value3 = service.get('someOtherKey');
    expect(value1).toBeFalsy();
    expect(value2).toBeFalsy();
    expect(value3).toBeFalsy();
  });

});
