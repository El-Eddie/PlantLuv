import { Injectable } from '@angular/core';
import { PlantService } from './plant.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Plant } from '../models/plant.model';
import { NewUserPlant} from '../models/new-plant.model';

@Injectable({
  providedIn: 'root'
})
export class MockPlantService extends PlantService {

  fakePlantList: Plant[] = [];
  plantImageURL: string = "assets/img/plant-full.jpg";
  plantThumbnailURL: string = "assets/img/plants/plant-thumb.jpg";
  lastID: number;

  constructor(private http: HttpClient) {
    super(http)
    this.MakeUpSomePlants();
    this.lastID = Math.max( ...this.fakePlantList.map(plant => plant.plantId))
  }

  search(criteria: string): Observable<Plant[]>{
    let results = this.fakePlantList.filter( plant =>
      {
        plant.isPublic &&
        ( plant.commonName.indexOf( criteria ) != -1 ||
        plant.lattinName.indexOf( criteria ) != -1 )
      });
    return of(results);
  }

  getUserPlants(id: string): Observable<Plant[]>{
    return of( this.fakePlantList.filter( plant => plant.ownerId == id ));
  }

  grab(id: number): Observable<Plant>{
    return of( this.fakePlantList.find( plant => plant.plantId == id ));
  }

  create(plant: NewUserPlant): Observable<Plant>{
    var newPlant: Plant = {
      plantId: ++this.lastID,
      commonName: plant.plantType,
      lattinName: "fakeus plantus",
      waterAgain: null,
      fertalizeAgain: null,
      height: null,
      primaryImageID: this.plantThumbnailURL,
      isPublic: false,
      lightLevel: 'Med',
      toxisity: ['Pet-Safe'],
      isFavorite: false,
      ...plant,
    };

    this.fakePlantList.push(newPlant);
    console.log(plant);
    return of(newPlant);
  }

  save(plant: Plant): Observable<Plant>{
    let match = this.fakePlantList.find(thing => thing.plantId == plant.plantId);
    if (match)
    {
      this.fakePlantList = this.fakePlantList.map(thing =>
        thing.plantId === match.plantId ? plant : thing
      )
    } else {
      plant.plantId = ++this.lastID;
      this.fakePlantList = [ ...this.fakePlantList, plant];
    }
   return of(plant)
  }

  delete(id: number):  Observable<Plant>{
    let matchIndex = this.fakePlantList.findIndex(thing => thing.plantId == id);
    console.log(matchIndex);
    if (matchIndex != -1)
    {
      console.log(this.fakePlantList);
      this.fakePlantList = this.fakePlantList.splice(matchIndex, 0);
      console.log(this.fakePlantList);
    }
    return of(null)
  }

  waterPlant(ids: number[]): Observable<Plant[]>{
    let plantIndex = this.fakePlantList.findIndex(thing => ids.includes(thing.plantId));
    if (plantIndex != -1)
    {
      this.fakePlantList[plantIndex].lastWatered = new Date(Date.now());
      return of(this.fakePlantList)
    }
   return of(null)
  }


  fertalizePlant(ids: number[]): Observable<Plant[]>{
    let plantIndex = this.fakePlantList.findIndex(thing => ids.includes(thing.plantId));
    if (plantIndex != -1)
    {
      this.fakePlantList[plantIndex].lastFertalized = new Date(Date.now());
      return of(this.fakePlantList)
    }
    return of(null)
  }

  toggleFavorite(id: number): Observable<Plant>{
    let plantIndex = this.fakePlantList.findIndex(thing => thing.plantId == id);
    if (plantIndex != -1){
      let plant = this.fakePlantList[plantIndex];
      plant.isFavorite = !plant.isFavorite;
    }
    return of(null);
  }

  toggleAlerts(plant: Plant): Observable<Plant>{
    let plantIndex = this.fakePlantList.findIndex(thing => thing.plantId == plant.plantId);
    if (plantIndex != -1){
      let plant = this.fakePlantList[plantIndex];
      plant.receiveNotifications = !plant.receiveNotifications;
    }
    return of(null);
  }


  MakeUpSomePlants(){
    this.fakePlantList = [
      {
        plantId: 1,
        typeId: 5,
        ownerId: "user@me.com",
        commonName: "Jade Plant",
        nickName: "Jade",
        lattinName: "Crassula Ovata",
        lastWatered: new Date(Date.parse("10/21/2019 1:40:58")),
        waterAgain: new Date(Date.parse("10/26/2019")),
        lastFertalized: new Date(Date.parse("10/30/2019 11:02:34")),
        fertalizeAgain: new Date(Date.parse("11/6/2019")),
        height: 64,
        birthday: new Date(Date.parse("9/21/2019")),
        receiveNotifications: false,
        primaryImageID: this.plantThumbnailURL,
        imageIDs: [1,2,3],
        thumbnailURL: "assets/img/plants/plant-thumb.jpg",
        isPublic: true,
        isFavorite: true,
        lightLevel: 'Low',
        toxisity: ['Cats'],
      },
      {
        plantId: 2,
        typeId: 1,
        ownerId: "user@me.com",
        commonName: "Snow Queen Pothos",
        nickName: "Snow Queen Pothos",
        lattinName: "Epipremnum Aureum",
        lastWatered: new Date(Date.parse("1/7/2020 0:14:47")),
        waterAgain: new Date(Date.parse("1/10/2020")),
        lastFertalized: new Date(Date.parse("1/18/2020 18:14:47")),
        fertalizeAgain: new Date(Date.parse("1/27/2020")),
        height: 58,
        birthday: new Date(Date.parse("11/21/2019")),
        receiveNotifications: false,
        primaryImageID: this.plantThumbnailURL,
        imageIDs: [4,5],
        thumbnailURL: "assets/img/plants/snow_queen_pothos-thumb.jpg",
        isPublic: true,
        isFavorite: false,
        lightLevel: 'Medium',
        toxisity: ['Cats'],
      },
      {
        plantId: 12,
        typeId: 1,
        ownerId: "user@me.com",
        commonName: "Snow Queen Pothos",
        nickName: "Snowy",
        lattinName: "Epipremnum Aureum",
        lastWatered: new Date(Date.parse("1/7/2020 0:14:47")),
        waterAgain: new Date(Date.parse("1/10/2020")),
        lastFertalized: new Date(Date.parse("1/18/2020 18:14:47")),
        fertalizeAgain: new Date(Date.parse("1/27/2020")),
        height: 58,
        birthday: new Date(Date.parse("11/21/2019")),
        receiveNotifications: false,
        primaryImageID: this.plantThumbnailURL,
        imageIDs: [4,5],
        thumbnailURL: "assets/img/plants/snow_queen_pothos-thumb.jpg",
        isPublic: true,
        isFavorite: false,
        lightLevel: 'Medium',
        toxisity: ['Cats'],
      },
      {
        plantId: 3,
        typeId: 2,
        ownerId: "user@me.com",
        commonName: "Marble Queen Pothos",
        nickName: "Marble Queen Pothos",
        lattinName: "Epipremnum Aureum",
        lastWatered: new Date(Date.parse("1/7/2020 0:14:47")),
        waterAgain: new Date(Date.parse("1/12/2020")),
        lastFertalized: new Date(Date.parse("1/1/2020 21:07:35")),
        fertalizeAgain: new Date(Date.parse("1/14/2020")),
        height: 60,
        birthday: new Date(Date.parse("12/25/2019")),
        receiveNotifications: false,
        primaryImageID: this.plantThumbnailURL,
        imageIDs: [6,7,8,9],
        thumbnailURL: "assets/img/plants/marble_queen_pothos-thumb.jpg",
        isPublic: false,
        isFavorite: false,
        lightLevel: 'Low/Medium',
        toxisity: ['Cats'],
      },
      {
        plantId: 4,
        typeId: 3,
        ownerId: "user@me.com",
        commonName: "Sundew",
        nickName: "Sundew",
        lattinName: "Drosera spatulata",
        lastWatered: new Date(Date.parse("1/7/2020 0:14:47")),
        waterAgain: new Date(Date.parse("1/13/2020")),
        lastFertalized: new Date(Date.parse("1/17/2020 16:33:59")),
        fertalizeAgain: new Date(Date.parse("1/30/2020")),
        height: 90,
        birthday: new Date(Date.parse("12/9/2019")),
        receiveNotifications: false,
        primaryImageID: this.plantThumbnailURL,
        imageIDs: [],
        thumbnailURL: "assets/img/plants/dorsera_spatulata-thumb.jpg",
        isPublic: true,
        isFavorite: true,
        lightLevel: 'Medium/High',
        toxisity: ['Cats', 'dogs'],
      },
      {
        plantId: 5,
        typeId: 4,
        ownerId: "user@me.com",
        commonName: "African Violet",
        nickName: "African Violet",
        lattinName: "Saintpaulia",
        lastWatered: new Date(Date.parse("1/7/2020 0:14:47")),
        waterAgain: new Date(Date.parse("1/12/2020")),
        lastFertalized: new Date(Date.parse("12/28/2019 15:36:23")),
        fertalizeAgain: new Date(Date.parse("1/11/2020")),
        height: 74,
        birthday: new Date(Date.parse("12/19/2019")),
        receiveNotifications: true,
        primaryImageID: this.plantThumbnailURL,
        imageIDs: [10,11,12,13],
        thumbnailURL: "assets/img/plants/saintpaulia-thumb.jpg",
        isPublic: true,
        isFavorite: true,
        lightLevel: 'Low/Medium',
        // toxisity: ['none'],
        toxisity: ['Pet-Safe'],
      },
      {
        plantId: 6,
        typeId: 1,
        ownerId: "user@me.com",
        commonName: "Snow Queen Pothos",
        nickName: "Snowy2: Pothos' revenge",
        lattinName: "Epipremnum aureum",
        lastWatered: new Date(Date.parse("1/7/2020 0:14:47")),
        waterAgain: new Date(Date.parse("1/13/2020")),
        lastFertalized: new Date(Date.parse("1/2/2020 4:48:23")),
        fertalizeAgain: new Date(Date.parse("1/13/2020")),
        height: 39,
        birthday: new Date(Date.parse("12/13/2019")),
        receiveNotifications: true,
        primaryImageID: this.plantThumbnailURL,
        imageIDs: [],
        thumbnailURL: "assets/img/plants/snow_queen_pothos-thumb.jpg",
        isPublic: false,
        isFavorite: false,
        lightLevel: 'Medium',
        toxisity: ['Dogs'],
      },
      {
        plantId: 7,
        typeId: 2,
        ownerId: "user@me.com",
        commonName: "Marble Queen Pothos",
        nickName: "Marble Queen Pothos",
        lattinName: "Epipremnum aureum",
        lastWatered: new Date(Date.parse("1/7/2020 0:14:47")),
        waterAgain: new Date(Date.parse("1/13/2020")),
        lastFertalized: new Date(Date.parse("12/31/2019 12:43:35")),
        fertalizeAgain: new Date(Date.parse("1/7/2020")),
        height: 19,
        birthday: new Date(Date.parse("11/28/2019")),
        receiveNotifications: false,
        primaryImageID: this.plantThumbnailURL,
        imageIDs: [14,15],
        thumbnailURL: "assets/img/plants/marble_queen_pothos-thumb.jpg",
        isPublic: false,
        isFavorite: false,
        lightLevel: 'Medium/High',
        //toxisity: ['Cats', 'dogs'],
        toxisity: ['Cats', 'Dogs'],
      },
      {
        plantId: 8,
        typeId: 3,
        ownerId: "user@me.com",
        commonName: "Sundew",
        nickName: "Sundew",
        lattinName: "Drosera spatulata",
        lastWatered: new Date(Date.parse("10/20/2020 0:19:59")),
        waterAgain: new Date(Date.parse("10/22/2020")),
        lastFertalized: new Date(Date.parse("10/17/2020 8:15:11")),
        fertalizeAgain: new Date(Date.parse("10/29/2020")),
        height: 13,
        birthday: new Date(Date.parse("9/4/2020")),
        receiveNotifications: true,
        primaryImageID: this.plantThumbnailURL,
        imageIDs: [],
        thumbnailURL: "assets/img/plants/dorsera_spatulata-thumb.jpg",
        isPublic: true,
        isFavorite: true,
        lightLevel: 'High',
        // toxisity: ['none'],
        toxisity: ['Pet-Safe'],
      },
      {
        plantId: 9,
        typeId: 4,
        ownerId: "user@me.com",
        commonName: "African Violet",
        nickName:  "Violet",
        lattinName: "Saintpaulia",
        lastWatered: new Date(Date.parse("10/20/2020 0:19:59")),
        waterAgain: new Date(Date.parse("10/26/2020")),
        lastFertalized: new Date(Date.parse("10/22/2020 19:31:59")),
        fertalizeAgain: new Date(Date.parse("11/4/2020")),
        height: 53,
        birthday: new Date(Date.parse("9/1/2020")),
        receiveNotifications: false,
        primaryImageID: this.plantThumbnailURL,
        imageIDs: [16,17,18],
        thumbnailURL: "assets/img/plants/saintpaulia-thumb.jpg",
        isPublic: true,
        isFavorite: false,
        lightLevel: 'Medium/High',
        toxisity: ['Small-Animals'],
      },
    ]
  }
}