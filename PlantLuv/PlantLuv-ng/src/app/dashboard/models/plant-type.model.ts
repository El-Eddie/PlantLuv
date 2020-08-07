import { PhotoData } from "./photo-data.model"

export interface PlantType {
  typeId: number;
  // imageInfo: PhotoData;
  // imageURL: string;
  thumbnailURL: string;
  commonName: string;
  latinName: string;
  description: string;
  blurb: string;
  lightLevel: LightLevel;
  humidityLowLevel: HumidityLowLevel;
  humidityHighLevel: HumidityHighLevel;
  fertalizerFrequency: FertalizerFrequency;
  fertalizerType: FertalizerType;
  soilPH: SoilPH;
  soilType: SoilType;
  waterFrequency: WaterFrequency;
  waterType: WaterType;
  difficulty: Difficulty,
  toxisity: Toxisity[],
  kingdom: Kingdom,
  clade1: Clade1,
  clade2: Clade2,
  clade3: Clade3,
  order: Order,
  family: Family,
  subFamily: SubFamily,
  genus: Genus
}

export type LightLevel = 'Low' | 'Medium' | 'Bright'

export type HumidityLowLevel = '10' | '15' | '20' | '25' | '30' | '35' | '40' | '45' | '50' | '55' | '60' | '65' | '70' | '75' | '80' | '85' | '90' | '95' | '100'

export type HumidityHighLevel = '10' | '15' | '20' | '25' | '30' | '35' | '40' | '45' | '50' | '55' | '60' | '65' | '70' | '75' | '80' | '85' | '90' | '95' | '100'

export type FertalizerFrequency = 'None' | 'Weekly' | 'Monthly' | 'When watered'

export type FertalizerType = ''

export type SoilPH = 'Any' | 'Acidic' | 'Slightly Acidic' | 'Neutral' | 'Slightly Basic' | 'Basic'

export type SoilType = 'Potting soil' | 'African Violet' | 'Carnivorous plant soil'

export type WaterFrequency = 'Daily' | 'Weekly' | 'When soil becomes dry' | 'Infrequently' | 'Always keep moist' | 'Water from bottom'

export type WaterType = 'Any' | 'Distilled/Purified' | 'Tap' | 'Rain' | 'R/O'

export type Toxisity = 'Dogs' | 'Cats' | 'Small Animals' | 'Humans' | 'Pet-Safe' | 'Unknown'

export type Difficulty = 'Beginner' | 'Elementary' | 'Intermediate' | 'Advance' | 'Expert'

export type Kingdom = 'Plantae'

export type Clade1 = "Tracheophytes"

export type Clade2 = "Angiosperms"

export type Clade3 = "Monocots"

export type Order = "Alismatales"

export type Family = "Araceae"

export type SubFamily = "Pothoideae"

export type Genus = "Pothos"
