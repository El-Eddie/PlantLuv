import { Injectable } from '@angular/core';
import { PlantTypeService } from './plant-type.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { PlantType } from '../models/plant-type.model';

@Injectable({
  providedIn: 'root'
})
export class MockPlantTypeService extends PlantTypeService {

  typeList: PlantType[] = [];

  constructor(private http: HttpClient) {
    super(http)
    this.getPlantTypes();
  }

  search(criteria: string): Observable<PlantType[]> {
    if (criteria === "") { return of(this.typeList) }
    let results = this.typeList.filter(type => {
      (type.commonName.indexOf(criteria) != -1) ||
        (type.latinName.indexOf(criteria) != -1)
    });
    return of(results);
  }

  grab(name: string): Observable<PlantType> {
    return of(this.typeList.find(type => type.latinName.toUpperCase() == name.toUpperCase()));
  }

  getPlantTypes() {
    this.typeList = [
      {
        typeId: 1,
        // imageInfo: {
        //   imgURL: "assets/img/snow_queen_pothos-full.jpg",
        //   imgWidth: 867,
        //   imgHeight: 971
        // },
        thumbnailURL: "assets/img/plants/snow_queen_pothos-thumb.jpg",
        commonName: "Snow Queen Pothos",
        latinName: "Epipremnum aureum",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        blurb: "",
        lightLevel: "Low",
        humidityLowLevel: "60",
        humidityHighLevel: "85",
        fertalizerFrequency: "Monthly",
        fertalizerType: "",
        soilType: "Potting soil",
        soilPH: "Acidic",
        waterType: "Tap",
        waterFrequency: "When soil becomes dry",
        toxisity: ['Cats', 'Dogs'],
        difficulty: 'Beginner',
        // Scientific Information
        kingdom: "Plantae",
        clade1: "Tracheophytes",
        clade2: "Angiosperms",
        clade3: "Monocots",
        order: "Alismatales",
        family: "Araceae",
        subFamily: "Pothoideae",
        genus: "Pothos"

      },
      {
        typeId: 2,
        // imageInfo: {
        //   imgURL: "assets/img/snow_queen_pothos-full.jpg",
        //   imgWidth: 867,
        //   imgHeight: 971
        // },
        thumbnailURL: "assets/img/plants/snow_queen_pothos-thumb.jpg",
        commonName: "Snow Queen Pothos",
        latinName: "Epipremnum aureum",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        blurb: "",
        lightLevel: "Bright",
        humidityLowLevel: "60",
        humidityHighLevel: "85",
        fertalizerFrequency: "Monthly",
        fertalizerType: "",
        soilType: "Potting soil",
        soilPH: "Acidic",
        waterType: "Tap",
        waterFrequency: "When soil becomes dry",
        toxisity: ['Cats', 'Dogs'],
        difficulty: 'Beginner',
        // Scientific Information
        kingdom: "Plantae",
        clade1: "Tracheophytes",
        clade2: "Angiosperms",
        clade3: "Monocots",
        order: "Alismatales",
        family: "Araceae",
        subFamily: "Pothoideae",
        genus: "Pothos"
      }
    ]
  }
}
