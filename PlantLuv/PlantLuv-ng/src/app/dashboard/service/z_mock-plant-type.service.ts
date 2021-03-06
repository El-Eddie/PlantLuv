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

  grab(id: number): Observable<PlantType> {
    return of(this.typeList.find(type => type.plantTypeID == id));
  }

  getPlantTypes() {
    this.typeList = [
      {
        plantTypeID: 1,
        // imageInfo: {
        //   imgURL: "assets/img/snow_queen_pothos-full.jpg",
        //   imgWidth: 867,
        //   imgHeight: 971
        // },
        stockImageID: "29FF400B-7FC8-471D-8204-BE2D1BA4D388",
        commonName: "Snow Queen Pothos",
        latinName: "Epipremnum aureum",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        blurb: "",
        lightLevel: "Low",
        humidityLowLevel: "60",
        humidityHighLevel: "85",
        fertilizerFrequency: "Monthly",
        fertalizerType: "",
        soilType: "Potting soil",
        soilPh: 1,
        waterType: "Tap",
        wateringFrequency: "When soil becomes dry",
        // toxisity: ['Cats', 'Dogs'],
        difficulty: 'Beginner',
        // Scientific Information
        scienceKingdom: "Plantae",
        scienceClade1: "Tracheophytes",
        scienceClade2: "Angiosperms",
        scienceClade3: "Monocots",
        scienceOrder: "Alismatales",
        scienceFamily: "Araceae",
        scienceSubfamily: "Pothoideae",
        scienceGenus: "Pothos",
        toxicToCats: false,
        toxicToDogs: false,
        toxicToSmallAnimals: false,
        lightTime: "long"

      },
      {
        plantTypeID: 2,
        // imageInfo: {
        //   imgURL: "assets/img/snow_queen_pothos-full.jpg",
        //   imgWidth: 867,
        //   imgHeight: 971
        // },
        stockImageID: "1C54ABB7-BF4D-44DF-8C19-AB1F4C5F6ECA",
        commonName: "Marble Queen Pothos",
        latinName: "Epipremnum aureum",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        blurb: "",
        lightLevel: "Low",
        humidityLowLevel: "60",
        humidityHighLevel: "85",
        fertilizerFrequency: "Monthly",
        fertalizerType: "",
        soilType: "Potting soil",
        soilPh: 1,
        waterType: "Tap",
        wateringFrequency: "When soil becomes dry",
        // toxisity: ['Cats', 'Dogs'],
        difficulty: 'Beginner',
        // Scientific Information
        scienceKingdom: "Plantae",
        scienceClade1: "Tracheophytes",
        scienceClade2: "Angiosperms",
        scienceClade3: "Monocots",
        scienceOrder: "Alismatales",
        scienceFamily: "Araceae",
        scienceSubfamily: "Pothoideae",
        scienceGenus: "Pothos",
        toxicToCats: false,
        toxicToDogs: false,
        toxicToSmallAnimals: false,
        lightTime: "long"
      }
    ]
  }
}
//
