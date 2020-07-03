import { PhotoData } from './photo-data.model'

export interface Plant {
  plantID: number;
  ownerID: String;
  typeID: number;
  commonName: string,
  nickName?: string,
  wherePurchased?: string;
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
  isPublic: boolean;  //not implementing social yet
  isFavorite: boolean;
  lightLevel: string;
  toxisity: string[];

}
