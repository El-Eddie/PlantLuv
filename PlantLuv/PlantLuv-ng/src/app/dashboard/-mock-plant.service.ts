import { Injectable } from '@angular/core';
import { PlantService } from './plant.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Plant } from './plant.model';

@Injectable({
  providedIn: 'root'
})
export class MockPlantService extends PlantService {

  fakePlantList: Plant[] = [];
  plantImageURL: string = "assets/img/plant-full.jpg";
  plantThumbnailURL: string = "assets/img/plant-thumb.jpg";

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
        imageURL: this.plantImageURL,
        thumbnailURL: this.plantThumbnailURL,
        isPublic: true,
      },
      {
        plantID: 2,
        ownerID: 1,
        species: "Weeping Fig",
        lattinName: "Ficus Benjamina",
        lastWatered: new Date(Date.parse("1/7/2020 0:14:47")),
        waterAgain: new Date(Date.parse("1/10/2020")),
        lastFertalized: new Date(Date.parse("1/18/2020 18:14:47")),
        fertalizeAgain: new Date(Date.parse("1/27/2020")),
        height: 58,
        birthday: new Date(Date.parse("11/21/2019")),
        receiveNotifications: false,
        imageURL: this.plantImageURL,
        thumbnailURL: this.plantThumbnailURL,
        isPublic: true,
      },
      {
        plantID: 3,
        ownerID: 1,
        species: "Kaffir Lily",
        lattinName: "Clivia Miniata",
        lastWatered: new Date(Date.parse("1/7/2020 0:14:47")),
        waterAgain: new Date(Date.parse("1/12/2020")),
        lastFertalized: new Date(Date.parse("1/1/2020 21:07:35")),
        fertalizeAgain: new Date(Date.parse("1/14/2020")),
        height: 60,
        birthday: new Date(Date.parse("12/25/2019")),
        receiveNotifications: false,
        imageURL: this.plantImageURL,
        thumbnailURL: this.plantThumbnailURL,
        isPublic: false,
      },
      {
        plantID: 4,
        ownerID: 2,
        species: "Slipper Orchid",
        lattinName: "Paphiopedilum",
        lastWatered: new Date(Date.parse("1/7/2020 0:14:47")),
        waterAgain: new Date(Date.parse("1/13/2020")),
        lastFertalized: new Date(Date.parse("1/17/2020 16:33:59")),
        fertalizeAgain: new Date(Date.parse("1/30/2020")),
        height: 90,
        birthday: new Date(Date.parse("12/9/2019")),
        receiveNotifications: false,
        imageURL: this.plantImageURL,
        thumbnailURL: this.plantThumbnailURL,
        isPublic: true,
      },
      {
        plantID: 5,
        ownerID: 1,
        species: "Moth Orchid",
        lattinName: "Phalaenopsis",
        lastWatered: new Date(Date.parse("1/7/2020 0:14:47")),
        waterAgain: new Date(Date.parse("1/12/2020")),
        lastFertalized: new Date(Date.parse("12/28/2019 15:36:23")),
        fertalizeAgain: new Date(Date.parse("1/11/2020")),
        height: 74,
        birthday: new Date(Date.parse("12/19/2019")),
        receiveNotifications: true,
        imageURL: this.plantImageURL,
        thumbnailURL: this.plantThumbnailURL,
        isPublic: true,
      },
      {
        plantID: 6,
        ownerID: 2,
        species: "Weeping Fig",
        lattinName: "Ficus Benjamina",
        lastWatered: new Date(Date.parse("1/7/2020 0:14:47")),
        waterAgain: new Date(Date.parse("1/13/2020")),
        lastFertalized: new Date(Date.parse("1/2/2020 4:48:23")),
        fertalizeAgain: new Date(Date.parse("1/13/2020")),
        height: 39,
        birthday: new Date(Date.parse("12/13/2019")),
        receiveNotifications: true,
        imageURL: this.plantImageURL,
        thumbnailURL: this.plantThumbnailURL,
        isPublic: false,
      },
      {
        plantID: 7,
        ownerID: 1,
        species: "Flaming Katy",
        lattinName: "Kalanchoe Blossfeldiana",
        lastWatered: new Date(Date.parse("1/7/2020 0:14:47")),
        waterAgain: new Date(Date.parse("1/13/2020")),
        lastFertalized: new Date(Date.parse("12/31/2019 12:43:35")),
        fertalizeAgain: new Date(Date.parse("1/7/2020")),
        height: 19,
        birthday: new Date(Date.parse("11/28/2019")),
        receiveNotifications: false,
        imageURL: this.plantImageURL,
        thumbnailURL: this.plantThumbnailURL,
        isPublic: false,
      },
      {
        plantID: 8,
        ownerID: 2,
        species: "Jade Plant",
        lattinName: "Crassula Ovata",
        lastWatered: new Date(Date.parse("10/20/2020 0:19:59")),
        waterAgain: new Date(Date.parse("10/22/2020")),
        lastFertalized: new Date(Date.parse("10/17/2020 8:15:11")),
        fertalizeAgain: new Date(Date.parse("10/29/2020")),
        height: 13,
        birthday: new Date(Date.parse("9/4/2020")),
        receiveNotifications: true,
        imageURL: this.plantImageURL,
        thumbnailURL: this.plantThumbnailURL,
        isPublic: true,
      },
      {
        plantID: 9,
        ownerID: 2,
        species: "Peace Lily",
        lattinName: "Spathiphyllum Wallisii",
        lastWatered: new Date(Date.parse("10/20/2020 0:19:59")),
        waterAgain: new Date(Date.parse("10/26/2020")),
        lastFertalized: new Date(Date.parse("10/22/2020 19:31:59")),
        fertalizeAgain: new Date(Date.parse("11/4/2020")),
        height: 53,
        birthday: new Date(Date.parse("9/1/2020")),
        receiveNotifications: false,
        imageURL: this.plantImageURL,
        thumbnailURL: this.plantThumbnailURL,
        isPublic: true,
      },
    ]
  }
}
