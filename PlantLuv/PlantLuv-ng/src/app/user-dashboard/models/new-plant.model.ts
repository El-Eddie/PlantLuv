export interface NewUserPlant {
  ownerID: string;
  plantType: string;
  typeID: number;
  nickName: string,
  birthday: Date;
  lastWatered: Date,
  lastFertalized: Date;
  wherePurchased?: string;
  receiveNotifications: boolean;
  thumbnailURL?: string;
}
