import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { IconService } from './icon.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

fdescribe('IconService', () => {
  let testBed: TestBed;
  let iconService: IconService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        MatIconRegistry,
        DomSanitizer
      ],
      providers: [
        IconService
      ]
    });
  testBed = getTestBed();
  iconService = testBed.get(IconService);
  });


  it('create an instance', () => {
    expect(iconService).toBeTruthy();
  });
});
