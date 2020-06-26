import { PhotoData } from "./photo-data.model"

export interface PlantType{
  typeID: number;
  // imageInfo: PhotoData;
  // imageURL: string;
  thumbnailURL: string;
  commonName: string;
  lattinName: string;
  family: string;
  description: string;
  blurb: string;
  lightLevel: LightLevel;
  humidityLevel: HumidityLevel;
  fertalizerFrequency: FertalizerFrequency;
  fertalizerType: FertalizerType;
  soilPH: SoilPH;
  soilType: SoilType;
  waterFrequency: WaterFrequency;
  waterType: WaterType;
  dificulty: Dificulty;
  toxisity: Toxisity[]
}

export type LightLevel = 'Low'
                        | 'Low/Med'
                        | 'Med'
                        | 'Med/High'
                        | 'High'

export type HumidityLevel = 'Low'
                        | 'Low/Med'
                        | 'Med'
                        | 'Med/High'
                        | 'High'

export type FertalizerFrequency = 'None'
                        | 'Weekly'
                        | 'Monthly'
                        | 'When watered'

export type FertalizerType = ''

export type SoilPH = 'Any'
                        | 'Acidic'
                        | 'Slightly Acidic'
                        | 'Neutral'
                        | 'Slightly Basic'
                        | 'Basic'

export type SoilType = 'Potting soil' | 'African Violet' | 'Carnivorous plant soil'

export type WaterFrequency = 'Daily'
                        | 'Weekly'
                        | 'When soil becomes dry'
                        | 'Infrequently'
                        | 'Always keep moist'
                        | 'Water from bottom'

export type WaterType = 'Any' | 'Distilled'

export type Dificulty = 'Easy' | 'Experianced' | 'Advanced'

export type Toxisity = 'dogs'
                        | 'cats'
                        | 'small animals'
                        | 'humans'
                        | 'safe'
                        | 'unknown'
