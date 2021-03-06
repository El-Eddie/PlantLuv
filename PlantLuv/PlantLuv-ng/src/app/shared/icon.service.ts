import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class IconService {

  constructor(
    private registry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {

    // Light Levels Icons
    this.registry.addSvgIcon('light-low', this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/icon/light-low.svg'));
    this.registry.addSvgIcon('light-medLow', this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/icon/light-medLow.svg'));
    this.registry.addSvgIcon('light-med', this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/icon/light-med.svg'));
    this.registry.addSvgIcon('light-medHigh', this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/icon/light-medHigh.svg'));
    this.registry.addSvgIcon('light-high', this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/icon/light-high.svg'));

    // Toxicity Icons
    this.registry.addSvgIcon('toxic-cat', this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/icon/toxic-kitty.svg'));
    this.registry.addSvgIcon('toxic-dog', this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/icon/toxic-doggo.svg'));
    this.registry.addSvgIcon('toxic-human', this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/icon/toxic-human.svg'));
    this.registry.addSvgIcon('toxic-smallAnimal', this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/icon/toxic-smallAnimal.svg'));
    this.registry.addSvgIcon('toxic-safe', this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/icon/toxic-safe.svg'));

    // Water & Fertalize Icons
    this.registry.addSvgIcon('action-watering', this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/icon/action-watering.svg'));
    this.registry.addSvgIcon('action-fertalize', this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/icon/action-fertalize.svg'));

    // Difficulty Level Star Icons
    this.registry.addSvgIcon('stars-1', this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/icon/stars-1.svg'));
    this.registry.addSvgIcon('stars-2', this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/icon/stars-2.svg'));
    this.registry.addSvgIcon('stars-3', this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/icon/stars-3.svg'));
    this.registry.addSvgIcon('stars-4', this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/icon/stars-4.svg'));
    this.registry.addSvgIcon('stars-5', this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/icon/stars-5.svg'));
  }
}
