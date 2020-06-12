import { Injectable } from '@angular/core';
import { PlantService } from './plant.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Plant } from '../models/plant.model';

@Injectable({
  providedIn: 'root'
})
export class MockPlantService extends PlantService {

  fakePlantList: Plant[] = [];
  plantImageURL: string = "assets/img/plant-full.jpg";
  plantThumbnailURL: string = "assets/img/plants/plant-thumb.jpg";

  constructor(private http: HttpClient) {
    super(http)
    this.MakeUpSomePlants();
  }

  search(criteria: string): Observable<Plant[]>{
    let results = this.fakePlantList.filter( plant =>
      {
        plant.isPublic &&
        ( plant.species.indexOf( criteria ) != -1 ||
        plant.lattinName.indexOf( criteria ) != -1 )
      });
    return of(results);
  }

  getUserPlants(id: number): Observable<Plant[]>{
    return of( this.fakePlantList.filter( plant => plant.ownerID == id ));
  }

  grab(id: number): Observable<Plant>{
    return of( this.fakePlantList.find( plant => plant.plantID == id ));
  }

  save(plant: Plant): Observable<Plant>{
    return of(null);
  }

  create(plant: Plant): Observable<Plant>{
    return of(null);
  }

  delete(id: number):  Observable<Plant>{
    console.log("plant "+id+" is getting deleted.")
    let plantIndex = this.fakePlantList.findIndex(thing => thing.plantID == id);
    if (plantIndex != -1)
    {
      let exPlant = this.fakePlantList.splice(plantIndex, 1);
      console.log("Plant number "+exPlant[0].plantID)
    }

    return of(null)
  }

  waterPlant(id: number): Observable<Plant>{
    let plantIndex = this.fakePlantList.findIndex(thing => thing.plantID == id);
    if (plantIndex != -1)
    {

      this.fakePlantList[plantIndex].lastWatered = new Date(Date.now());
      return of(this.fakePlantList[plantIndex])
    }
   return of(null)
  }


  fertalizePlant(id: number): Observable<Plant>{
    let plantIndex = this.fakePlantList.findIndex(thing => thing.plantID == id);
    if (plantIndex != -1)
    {

      this.fakePlantList[plantIndex].lastFertalized = new Date(Date.now());
      return of(this.fakePlantList[plantIndex])
    }
    return of(null)
  }

  toggleFavorite(id: number): Observable<Plant>{
    let plantIndex = this.fakePlantList.findIndex(thing => thing.plantID == id);
    if (plantIndex != -1){
      let plant = this.fakePlantList[plantIndex];
      plant.isFavorite = !plant.isFavorite;
    }
    return of(null);
  }

  toggleAlerts(id: number): Observable<Plant>{
    let plantIndex = this.fakePlantList.findIndex(thing => thing.plantID == id);
    if (plantIndex != -1){
      let plant = this.fakePlantList[plantIndex];
      plant.receiveNotifications = !plant.receiveNotifications;
    }
    return of(null);
  }


  MakeUpSomePlants(){
    this.fakePlantList = [
      {
        plantID: 1,
        ownerID: 1,
        species: "Jade Plant",
        lattinName: "Crassula Ovata",
        lastWatered: new Date(Date.parse("10/21/2019 1:40:58")),
        waterAgain: new Date(Date.parse("10/26/2019")),
        lastFertalized: new Date(Date.parse("10/30/2019 11:02:34")),
        fertalizeAgain: new Date(Date.parse("11/6/2019")),
        height: 64,
        birthday: new Date(Date.parse("9/21/2019")),
        receiveNotifications: false,
        // imageURL: this.plantImageURL,
        imageIDs: [1,2,3],
        thumbnailURL: "assets/img/plants/plant-thumb.jpg",
        isPublic: true,
        isFavorite: true,
        lightLevel: 'Low',
        toxisity: ['cats', 'small animals'],
      },
      {
        plantID: 2,
        ownerID: 1,
        species: "Snow Queen Pothos",
        lattinName: "Epipremnum Aureum",
        lastWatered: new Date(Date.parse("1/7/2020 0:14:47")),
        waterAgain: new Date(Date.parse("1/10/2020")),
        lastFertalized: new Date(Date.parse("1/18/2020 18:14:47")),
        fertalizeAgain: new Date(Date.parse("1/27/2020")),
        height: 58,
        birthday: new Date(Date.parse("11/21/2019")),
        receiveNotifications: false,
        // imageURL: this.plantImageURL,
        imageIDs: [4,5],
        thumbnailURL: "assets/img/plants/snow_queen_pothos-thumb.jpg",
        isPublic: true,
        isFavorite: false,
        lightLevel: 'Med',
        toxisity: ['cats'],
      },
      {
        plantID: 12,
        ownerID: 1,
        species: "Snow Queen Pothos",
        lattinName: "Epipremnum Aureum",
        lastWatered: new Date(Date.parse("1/7/2020 0:14:47")),
        waterAgain: new Date(Date.parse("1/10/2020")),
        lastFertalized: new Date(Date.parse("1/18/2020 18:14:47")),
        fertalizeAgain: new Date(Date.parse("1/27/2020")),
        height: 58,
        birthday: new Date(Date.parse("11/21/2019")),
        receiveNotifications: false,
        // imageURL: this.plantImageURL,
        imageIDs: [4,5],
        thumbnailURL: "assets/img/plants/snow_queen_pothos-thumb.jpg",
        isPublic: true,
        isFavorite: false,
        lightLevel: 'Med',
        toxisity: ['cats'],
      },
      {
        plantID: 11,
        ownerID: 1,
        species: "Snow Queen Pothos",
        lattinName: "Epipremnum Aureum",
        lastWatered: new Date(Date.parse("1/7/2020 0:14:47")),
        waterAgain: new Date(Date.parse("1/10/2020")),
        lastFertalized: new Date(Date.parse("1/18/2020 18:14:47")),
        fertalizeAgain: new Date(Date.parse("1/27/2020")),
        height: 58,
        birthday: new Date(Date.parse("11/21/2019")),
        receiveNotifications: false,
        // imageURL: this.plantImageURL,
        imageIDs: [4,5],
        thumbnailURL: "assets/img/plants/snow_queen_pothos-thumb.jpg",
        isPublic: true,
        isFavorite: false,
        lightLevel: 'Med',
        toxisity: ['cats'],
      },
      {
        plantID: 10,
        ownerID: 1,
        species: "Snow Queen Pothos",
        lattinName: "Epipremnum Aureum",
        lastWatered: new Date(Date.parse("1/7/2020 0:14:47")),
        waterAgain: new Date(Date.parse("1/10/2020")),
        lastFertalized: new Date(Date.parse("1/18/2020 18:14:47")),
        fertalizeAgain: new Date(Date.parse("1/27/2020")),
        height: 58,
        birthday: new Date(Date.parse("11/21/2019")),
        receiveNotifications: false,
        // imageURL: this.plantImageURL,
        imageIDs: [4,5],
        thumbnailURL: "assets/img/plants/snow_queen_pothos-thumb.jpg",
        isPublic: true,
        isFavorite: false,
        lightLevel: 'Med',
        toxisity: ['cats'],
      },
      {
        plantID: 3,
        ownerID: 1,
        species: "Marble Queen Pothos",
        lattinName: "Epipremnum Aureum",
        lastWatered: new Date(Date.parse("1/7/2020 0:14:47")),
        waterAgain: new Date(Date.parse("1/12/2020")),
        lastFertalized: new Date(Date.parse("1/1/2020 21:07:35")),
        fertalizeAgain: new Date(Date.parse("1/14/2020")),
        height: 60,
        birthday: new Date(Date.parse("12/25/2019")),
        receiveNotifications: false,
        // imageURL: this.plantImageURL,
        imageIDs: [6,7,8,9],
        thumbnailURL: "assets/img/plants/marble_queen_pothos-thumb.jpg",
        isPublic: false,
        isFavorite: false,
        lightLevel: 'Low/Med',
        toxisity: ['unknown'],
      },
      {
        plantID: 4,
        ownerID: 1,
        species: "Sundew",
        lattinName: "Drosera spatulata",
        lastWatered: new Date(Date.parse("1/7/2020 0:14:47")),
        waterAgain: new Date(Date.parse("1/13/2020")),
        lastFertalized: new Date(Date.parse("1/17/2020 16:33:59")),
        fertalizeAgain: new Date(Date.parse("1/30/2020")),
        height: 90,
        birthday: new Date(Date.parse("12/9/2019")),
        receiveNotifications: false,
        // imageURL: this.plantImageURL,
        imageIDs: [],
        thumbnailURL: "assets/img/plants/dorsera_spatulata-thumb.jpg",
        isPublic: true,
        isFavorite: true,
        lightLevel: 'Med/High',
        toxisity: ['Cats', 'dogs'],
      },
      {
        plantID: 5,
        ownerID: 1,
        species: "African Violet",
        lattinName: "Saintpaulia",
        lastWatered: new Date(Date.parse("1/7/2020 0:14:47")),
        waterAgain: new Date(Date.parse("1/12/2020")),
        lastFertalized: new Date(Date.parse("12/28/2019 15:36:23")),
        fertalizeAgain: new Date(Date.parse("1/11/2020")),
        height: 74,
        birthday: new Date(Date.parse("12/19/2019")),
        receiveNotifications: true,
        // imageURL: this.plantImageURL,
        imageIDs: [10,11,12,13],
        thumbnailURL: "assets/img/plants/saintpaulia-thumb.jpg",
        isPublic: true,
        isFavorite: true,
        lightLevel: 'Low/Med',
        // toxisity: ['none'],
        toxisity: [],
      },
      {
        plantID: 6,
        ownerID: 1,
        species: "Snow Queen Pothos",
        lattinName: "Epipremnum aureum",
        lastWatered: new Date(Date.parse("1/7/2020 0:14:47")),
        waterAgain: new Date(Date.parse("1/13/2020")),
        lastFertalized: new Date(Date.parse("1/2/2020 4:48:23")),
        fertalizeAgain: new Date(Date.parse("1/13/2020")),
        height: 39,
        birthday: new Date(Date.parse("12/13/2019")),
        receiveNotifications: true,
        // imageURL: this.plantImageURL,
        imageIDs: [],
        thumbnailURL: "assets/img/plants/snow_queen_pothos-thumb.jpg",
        isPublic: false,
        isFavorite: false,
        lightLevel: 'Med',
        toxisity: ['dogs'],
      },
      {
        plantID: 7,
        ownerID: 1,
        species: "Marble Queen Pothos",
        lattinName: "Epipremnum aureum",
        lastWatered: new Date(Date.parse("1/7/2020 0:14:47")),
        waterAgain: new Date(Date.parse("1/13/2020")),
        lastFertalized: new Date(Date.parse("12/31/2019 12:43:35")),
        fertalizeAgain: new Date(Date.parse("1/7/2020")),
        height: 19,
        birthday: new Date(Date.parse("11/28/2019")),
        receiveNotifications: false,
        // imageURL: this.plantImageURL,
        imageIDs: [14,15],
        thumbnailURL: "assets/img/plants/marble_queen_pothos-thumb.jpg",
        isPublic: false,
        isFavorite: false,
        lightLevel: 'Med/High',
        //toxisity: ['Cats', 'dogs'],
        toxisity: ['Cats', 'dogs', 'small animals', 'humans'],
      },
      {
        plantID: 8,
        ownerID: 1,
        species: "Sundew",
        lattinName: "Drosera spatulata",
        lastWatered: new Date(Date.parse("10/20/2020 0:19:59")),
        waterAgain: new Date(Date.parse("10/22/2020")),
        lastFertalized: new Date(Date.parse("10/17/2020 8:15:11")),
        fertalizeAgain: new Date(Date.parse("10/29/2020")),
        height: 13,
        birthday: new Date(Date.parse("9/4/2020")),
        receiveNotifications: true,
        // imageURL: this.plantImageURL,
        imageIDs: [],
        thumbnailURL: "assets/img/plants/dorsera_spatulata-thumb.jpg",
        isPublic: true,
        isFavorite: true,
        lightLevel: 'High',
        // toxisity: ['none'],
        toxisity: [],
      },
      {
        plantID: 9,
        ownerID: 1,
        species: "African Violet",
        lattinName: "Saintpaulia",
        lastWatered: new Date(Date.parse("10/20/2020 0:19:59")),
        waterAgain: new Date(Date.parse("10/26/2020")),
        lastFertalized: new Date(Date.parse("10/22/2020 19:31:59")),
        fertalizeAgain: new Date(Date.parse("11/4/2020")),
        height: 53,
        birthday: new Date(Date.parse("9/1/2020")),
        receiveNotifications: false,
        // imageURL: this.plantImageURL,
        imageIDs: [16,17,18],
        thumbnailURL: "assets/img/plants/saintpaulia-thumb.jpg",
        isPublic: true,
        isFavorite: false,
        lightLevel: 'Med/High',
        toxisity: ['humans'],
      },
    ]
  }
}
