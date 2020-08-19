import { Injectable } from '@angular/core';
import { PlantService } from './plant.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Plant } from '../models/plant.model';
import { NewUserPlant } from '../models/new-plant.model';

@Injectable({
  providedIn: 'root'
})
export class MockPlantService extends PlantService {

  fakePlantList: Plant[] = [];
  plantImageURL: string = "assets/img/plant-full.jpg";
  plantstockImageID: string = "assets/img/plants/plant-thumb.jpg";
  lastID: number;

  constructor(private http: HttpClient) {
    super(http)
    this.MakeUpSomePlants();
    this.lastID = Math.max(...this.fakePlantList.map(plant => plant.plantId))
  }

  search(criteria: string): Observable<Plant[]> {
    let results = this.fakePlantList.filter(plant => {
      plant.isPublic &&
        (plant.commonName.indexOf(criteria) != -1 ||
          plant.latinName.indexOf(criteria) != -1)
    });
    return of(results);
  }

  getUserPlants(id: string): Observable<Plant[]> {
    return of(this.fakePlantList.filter(plant => plant.ownerId == id));
  }

  grab(id: number): Observable<Plant> {
    return of(this.fakePlantList.find(plant => plant.plantId == id));
  }

  create(plant: NewUserPlant): Observable<Plant> {
    var newPlant: Plant = {
      plantId: ++this.lastID,
      commonName: plant.plantType,
      latinName: "fakeus plantus",
      waterAgain: null,
      fertalizeAgain: null,
      height: null,
      primaryImageID: this.plantstockImageID,
      isPublic: false,
      lightLevel: 'Med',
      toxisity: ['Pet-Safe'],
      difficulty: 'Intermediate',
      isFavorite: false,
      ...plant,
    };

    this.fakePlantList.push(newPlant);
    console.log(plant);
    return of(newPlant);
  }

  save(plant: Plant): Observable<Plant> {
    let match = this.fakePlantList.find(thing => thing.plantId == plant.plantId);
    if (match) {
      this.fakePlantList = this.fakePlantList.map(thing =>
        thing.plantId === match.plantId ? plant : thing
      )
    } else {
      plant.plantId = ++this.lastID;
      this.fakePlantList = [...this.fakePlantList, plant];
    }
    return of(plant)
  }

  delete(id: number): Observable<Plant> {
    let matchIndex = this.fakePlantList.findIndex(thing => thing.plantId == id);
    console.log(matchIndex);
    if (matchIndex != -1) {
      console.log(this.fakePlantList);
      this.fakePlantList = this.fakePlantList.splice(matchIndex, 0);
      console.log(this.fakePlantList);
    }
    return of(null)
  }

  waterPlant(ids: number[]): Observable<Plant[]> {
    let plantIndex = this.fakePlantList.findIndex(thing => ids.includes(thing.plantId));
    if (plantIndex != -1) {
      this.fakePlantList[plantIndex].lastWatered = new Date(Date.now());
      return of(this.fakePlantList)
    }
    return of(null)
  }


  fertalizePlant(ids: number[]): Observable<Plant[]> {
    let plantIndex = this.fakePlantList.findIndex(thing => ids.includes(thing.plantId));
    if (plantIndex != -1) {
      this.fakePlantList[plantIndex].lastFertalized = new Date(Date.now());
      return of(this.fakePlantList)
    }
    return of(null)
  }

  toggleFavorite(id: number): Observable<Plant> {
    let plantIndex = this.fakePlantList.findIndex(thing => thing.plantId == id);
    if (plantIndex != -1) {
      let plant = this.fakePlantList[plantIndex];
      plant.isFavorite = !plant.isFavorite;
    }
    return of(null);
  }

  toggleAlerts(plant: Plant): Observable<Plant> {
    let plantIndex = this.fakePlantList.findIndex(thing => thing.plantId == plant.plantId);
    if (plantIndex != -1) {
      let plant = this.fakePlantList[plantIndex];
      plant.receiveNotifications = !plant.receiveNotifications;
    }
    return of(null);
  }


  MakeUpSomePlants() {
    this.fakePlantList = [
      {
        plantId: 1,
        typeId: 5,
        ownerId: "user@me.com",
        commonName: "Jade Plant",
        nickName: "Jade",
        latinName: "Crassula Ovata",
        lastWatered: new Date(Date.parse("10/21/2019 1:40:58")),
        waterAgain: new Date(Date.parse("10/26/2019")),
        lastFertalized: new Date(Date.parse("10/30/2019 11:02:34")),
        fertalizeAgain: new Date(Date.parse("11/6/2019")),
        height: 64,
        birthday: new Date(Date.parse("9/21/2019")),
        receiveNotifications: false,
        primaryImageID: this.plantstockImageID,
        imageIDs: [1, 2, 3],
        thumbnailUrl: "assets/img/plants/plant-thumb.jpg",
        isPublic: true,
        isFavorite: true,
        lightLevel: 'Low',
        toxisity: ['Cats'],
        difficulty: 'Beginner'
      }

    ]
  }
}
