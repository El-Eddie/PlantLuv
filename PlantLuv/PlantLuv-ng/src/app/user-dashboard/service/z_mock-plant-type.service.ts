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

  grab(name: string): Observable<PlantType>{
    return of( this.typeList.find ( type => type.lattinName.toUpperCase() == name.toUpperCase() ));
  }

  getPlantTypes(){
    this.typeList = [
      {
        typeID: 1,
        // imageInfo: {
        //   imgURL: "assets/img/snow_queen_pothos-full.jpg",
        //   imgWidth: 867,
        //   imgHeight: 971
        // },
        thumbnailURL: "assets/img/plants/snow_queen_pothos-thumb.jpg",
        commonName: "Snow Queen Pothos",
        lattinName: "Epipremnum aureum",
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
        toxisity: ['cats','dogs'],
        dificulty: "Easy",
      },
      {
      typeID: 2,
      // imageInfo: {
      //   imgURL: "assets/img/marble_queen_pothos-full.jpg",
      //   imgHeight: 867,
      //   imgWidth: 934
      // },
      thumbnailURL: "assets/img/plants/marble_queen_pothos-thumb.jpg",
      commonName: "Marble Queen Pothos",
      lattinName: "Epipremnum aureum",
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
      toxisity: ['cats','dogs'],
      dificulty: "Easy",
      },
      {
      typeID: 3,
      // imageInfo: {
      //   imgURL: "assets/img/dorsera_spatulata-full.jpg",
      //   imgHeight: 960,
      //   imgWidth: 720,
      // },
      thumbnailURL: "assets/img/plants/dorsera_spatulata-thumb.jpg",
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
      toxisity: ['cats','dogs'],
      dificulty: "Easy",
      },
      {
      typeID: 4,
      // imageInfo: {
      //   imgURL: "assets/img/saintpaulia-full.jpg",
      //   imgHeight: 596,
      //   imgWidth: 800
      // },
      thumbnailURL: "assets/img/plants/saintpaulia-thumb.jpg",
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
      toxisity: ['safe'],
      dificulty: "Easy",
      },
      {
        typeID: 5,
        // imageInfo: {
        //   imgURL: "assets/img/snow_queen_pothos-full.jpg",
        //   imgWidth: 867,
        //   imgHeight: 971
        // },
        thumbnailURL: "assets/img/plants/plant-thumb.jpg",
        commonName: "Jade",
        lattinName: "Crassula Ovata",
        family: "Crassula ",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        blurb: "",
        lightLevel: "High",
        humidityLevel: "Med",
        fertalizerFrequency: "Monthly",
        fertalizerType: "",
        soilType: "Potting soil",
        soilPH: "Slightly Acidic",
        waterType: "Any",
        waterFrequency: "When soil becomes dry",
        toxisity: ['safe'],
        dificulty: "Easy",
      },
    ]
  }
}
