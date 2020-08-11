import { PhotoData } from './photo-data.model'

export interface Plant {
  plantId: number;
  ownerId: String;
  typeId: number;
  commonName: string,
  nickName?: string,
  wherePurchased?: string;
  latinName: string,
  lastWatered: Date;
  waterAgain: Date;
  lastFertalized: Date;
  fertalizeAgain: Date;
  height: number; //wont need
  birthday: Date;
  receiveNotifications: boolean;
  primaryImageID: string;
  imageIDs?: number[];
  thumbnailURL?: string;
  isPublic: boolean;  //not implementing social yet
  isFavorite: boolean;
  lightLevel: string;
  toxisity: string[];
  difficulty: string;
}
