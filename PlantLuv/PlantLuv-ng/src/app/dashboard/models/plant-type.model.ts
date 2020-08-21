import { PhotoData } from "./photo-data.model"

export interface PlantType {
  plantTypeID: number;
  stockImageID: string;
  commonName: string;
  latinName: string;
  description: string;
  blurb: string;
  lightLevel: string;
  lightTime: string;
  humidityLowLevel: string;
  humidityHighLevel: string;
  fertilizerFrequency: string;
  fertalizerType: string;
  soilPh: number;
  soilType: string;
  wateringFrequency: string;
  waterType: string;
  difficulty: string,
  toxicToCats: boolean,
  toxicToDogs: boolean,
  toxicToSmallAnimals: boolean,
  scienceKingdom: string,
  scienceClade1: string,
  scienceClade2: string,
  scienceClade3: string,
  scienceOrder: string,
  scienceFamily: string,
  scienceSubfamily: string,
  scienceGenus: string
}

export function blankPlantType(): PlantType {
  return {
    plantTypeID: 0,
    stockImageID: '',
    commonName: '',
    latinName: '',
    description: '',
    blurb: 'None',
    lightLevel: 'low',
    lightTime: '',
    humidityLowLevel: '0',
    humidityHighLevel: '100',
    fertilizerFrequency: 'weekly',
    fertalizerType: 'none',
    soilPh: 0,
    soilType: 'potting',
    wateringFrequency: 'weekly',
    waterType: 'tap',
    difficulty: 'beginner',
    toxicToCats: false,
    toxicToDogs: false,
    toxicToSmallAnimals: false,
    scienceKingdom: '',
    scienceClade1: '',
    scienceClade2: '',
    scienceClade3: '',
    scienceOrder: '',
    scienceFamily: '',
    scienceSubfamily: '',
    scienceGenus: '',
  };

}
