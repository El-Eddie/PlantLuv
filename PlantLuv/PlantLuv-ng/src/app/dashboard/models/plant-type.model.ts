import { PhotoData } from "./photo-data.model"

export interface PlantType {
  plantTypeID: number;
  // imageInfo: PhotoData;
  // imageURL: string;
  thumbnailUrl: string;
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
