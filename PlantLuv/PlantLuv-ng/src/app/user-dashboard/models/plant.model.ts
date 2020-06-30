import { PhotoData } from './photo-data.model'

export interface Plant {
  plantID: number;
  ownerID: number;
  commonName: string,
  nickName?: string,
  lattinName: string,
  lastWatered: Date;
  waterAgain: Date;
  lastFertalized: Date;
  fertalizeAgain: Date;
  height: number; //wont need
  birthday: Date;
  receiveNotifications: boolean;
  // imageURL: string;
  imageIDs?: number[];
  thumbnailURL?: string;
  //type: PlantType;
  isPublic: boolean;  //not implementing social yet
  isFavorite: boolean;
  lightLevel: string;
  toxisity: string[];

}
