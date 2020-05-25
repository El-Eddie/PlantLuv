import { Injectable } from '@angular/core';
import { PlantTypeService } from './plant-type.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { PlantType } from './plant-type.model';

@Injectable({
  providedIn: 'root'
})
export class MockPlantTypeService extends PlantTypeService {

  typeList: PlantType[] = [];

  constructor(private http: HttpClient) {
    super (http)
    this.getPlantTypes();
  }

  search(criteria: string): Observable<PlantType[]>{
    if (criteria === "") { return of(this.typeList) }
    let results =  this.typeList.filter ( type =>
      {
        ( type.commonName.indexOf(criteria) != -1 ) ||
        ( type.lattinName.indexOf(criteria) != -1 )
      });
    return of( results );
  }

  grab(id: number): Observable<PlantType>{
    return of( this.typeList.find ( type => type.typeID == id ));
  }

  getPlantTypes(){
    this.typeList = [
      {
        typeID: 1,
        imageURL: "assets/img/snow_queen_pothos-full.jpg",
        thumbnailURL: "assets/img/snow_queen_pothos-thumb.jpg",
        commonName: "Snow Queen Pothos",
        lattinName: "Epipremnum aureum 'Snow Queen'",
        family: "Aracaea",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        blurb: "",
        lightLevel: "Low/Med",
        humidityLevel: "Med",
        fertalizerFrequency: "Monthly",
        fertalizerType: "",
        soilType: "Potting soil",
        soilPH: "Slightly Acidic",
        waterType: "Any",
        waterFrequency: "When soil becomes dry",
        toxisity: "Cat & Dog",
        dificulty: "Easy",
      },
      {
      typeID: 2,
      imageURL: "assets/img/marble_queen_pothos-full.jpg",
      thumbnailURL: "assets/img/marble_queen_pothos-thumb.jpg",
      commonName: "Marble Queen Pothos",
      lattinName: "Epipremnum aureum 'Marble Queen'",
      family: "Aracaea",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      blurb: "",
      lightLevel: "Low/Med",
      humidityLevel: "Med",
      fertalizerFrequency: "Monthly",
      fertalizerType: "",
      soilType: "Potting soil",
      soilPH: "Slightly Acidic",
      waterType: "Any",
      waterFrequency: "When soil becomes dry",
      toxisity: "Cat & Dog",
      dificulty: "Easy",
      },
      {
      typeID: 3,
      imageURL: "assets/img/dorsera_spatulata-full.jpg",
      thumbnailURL: "assets/img/dorsera_spatulata-thumb.jpg",
      commonName: "Sundew",
      lattinName: "Drosera spatulata",
      family: "Droseraceae",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      blurb: "",
      lightLevel: "High",
      humidityLevel: "High",
      fertalizerFrequency: "None",
      fertalizerType: "",
      soilType: "Carnivorous plant soil",
      soilPH: "Any",
      waterType: "Distilled",
      waterFrequency: "Always keep moist",
      toxisity: "Unknown",
      dificulty: "Easy",
      },
      {
      typeID: 4,
      imageURL: "assets/img/saintpaulia-full.jpg",
      thumbnailURL: "assets/img/saintpaulia-thumb.jpg",
      commonName: "African Violet",
      lattinName: "Saintpaulia",
      family: "Gesneriaceae",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      blurb: "",
      lightLevel: "Med",
      humidityLevel: "Low/Med",
      fertalizerFrequency: "When watered",
      fertalizerType: "",
      soilType: "African Violet",
      soilPH: "Slightly Acidic",
      waterType: "Any",
      waterFrequency: "Water from bottom",
      toxisity: "None",
      dificulty: "Easy",
      }





    ]

  }
}
